using NHapi.Model.V25.Message;
using NHapi.Model.V25.Segment;
using NUnit.Framework;
using SanteDB.Core;
using SanteDB.Core.Security;
using SanteDB.Core.Services;
using SanteDB.Core.TestFramework;
using SanteMPI.Messaging.IHE.HL7;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace SanteMPI.Messaging.IHE.Test
{
    [ExcludeFromCodeCoverage]
    [TestFixture(Category = "Integration")]
    public class TestOpenHIEPixPdq : DataTest
    {
        // Device secret
        private readonly byte[] DeviceSecretA = new byte[] { 0x1, 0x2, 0x3, 0x4, 0x5, 0x6 };

        private readonly byte[] DeviceSecretB = new byte[] { 0x6, 0x5, 0x4, 0x3, 0x2, 0x1 };

        private IServiceManager m_serviceManager;

        /// <summary>
        /// Test context
        /// </summary>
        [SetUp]
        public void Initialize()
        {
            // Force load of the DLL
            Assert.NotNull(FirebirdSql.Data.FirebirdClient.FbCharset.Ascii);
            TestApplicationContext.TestAssembly = typeof(TestOpenHIEPixPdq).Assembly;
            TestApplicationContext.Initialize(TestContext.CurrentContext.TestDirectory);
            this.m_serviceManager = TestApplicationContext.Current.GetService<IServiceManager>();
        }

        /// <summary>
        /// This test validates that the Client Registry rejects a poorly formed message lacking appropriate assigner information in PID-3.
        /// </summary>
        [Test]
        public void TestOhieCr01()
        {
            // Step 1: Test harness sends ADT^A01 message where CX.4 of PID is missing
            var message = TestUtil.GetMessageEvent("OHIE-CR-01-10");
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);

            // Receiver rejects message with AR or AE
            TestUtil.AssertOutcome(result, "AR", "CR", "CE", "AE");
        }

        /// <summary>
        /// This test validates that the Client Registry is capable of populating the CX.4.1 from CX.4.2 and CX.4.3 or vice-versa given partial data in the CX.4 field.
        /// </summary>
        [Test]
        public void TestOhieCr02()
        {
            // Pre-Conditions: Setup receiver so that OID is configured
            using (AuthenticationContext.EnterSystemContext())
            {
                var aaService = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();
                TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);
                var aa = aaService.Get("TEST");
                if (aa == null)
                    aaService.Insert(new SanteDB.Core.Model.DataTypes.AssigningAuthority("TEST", "TEST", "2.16.840.1.113883.3.72.5.9.1"));

                // Test harness sends ADT^A01 Message where CX.4.1 of PID is missing by message containss 4.2 and 4.3
                var message = TestUtil.GetMessageEvent("OHIE-CR-02-10", DeviceSecretA);
                var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

                // Response is ACK A01
                Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AA", "CA");

                // MSH-5 and MSH-6 match
                Assert.AreEqual("TEST_HARNESS", (result.GetStructure("MSH") as MSH).ReceivingApplication.NamespaceID.Value);
                Assert.AreEqual("TEST", (result.GetStructure("MSH") as MSH).ReceivingFacility.NamespaceID.Value);

                // Test harness ensures that patient was registered and receiver has populated 4.1, 4.2, and 4.3
                message = TestUtil.GetMessageEvent("OHIE-CR-02-20", DeviceSecretA);
                result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

                // Response is RSP K23
                Assert.AreEqual("RSP", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("K23", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AA", "CA");

                // Exactly one PID segment
                var resp = result as RSP_K23;
                Assert.IsNotNull(resp.QUERY_RESPONSE);
                Assert.IsTrue(resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(a => a.AssigningAuthority.NamespaceID.Value == "TEST" && a.AssigningAuthority.UniversalID.Value == "2.16.840.1.113883.3.72.5.9.1" && a.AssigningAuthority.UniversalIDType.Value == "ISO"));

                // Test harness sends ADT A01 with OID missing but namespace
                message = TestUtil.GetMessageEvent("OHIE-CR-02-30", DeviceSecretA);
                result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

                // Response is ACK A01
                Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AA", "CA");

                // MSH-5 and MSH-6 match
                Assert.AreEqual("TEST_HARNESS", (result.GetStructure("MSH") as MSH).ReceivingApplication.NamespaceID.Value);
                Assert.AreEqual("TEST", (result.GetStructure("MSH") as MSH).ReceivingFacility.NamespaceID.Value);

                // Test harness validates patient was registered and populated segments properly
                message = TestUtil.GetMessageEvent("OHIE-CR-02-40", DeviceSecretA);
                result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

                // Response is RSP K23
                Assert.AreEqual("RSP", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("K23", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AA", "CA");

                // Exactly one PID segment
                resp = result as RSP_K23;
                Assert.IsNotNull(resp.QUERY_RESPONSE);
                Assert.IsTrue(resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(a => a.AssigningAuthority.NamespaceID.Value == "TEST" && a.AssigningAuthority.UniversalID.Value == "2.16.840.1.113883.3.72.5.9.1" && a.AssigningAuthority.UniversalIDType.Value == "ISO"));
            }
        }

        /// <summary>
        /// This test ensures that the receiver rejects messages which contain identifiers assigned from authorities which are unknown.
        /// </summary>
        [Test]
        public void TestOhieCr03()
        {
            // Remove any reference to TEST_BLOCK or OID 2.16.840.1.113883.3.72.5.9.4
            using (AuthenticationContext.EnterSystemContext())
            {
                var aaRepo = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();
                var aa = aaRepo.Get("TEST_BLOCK");
                if (aa != null)
                    aaRepo.Obsolete(aa.Key.Value);
                aa = aaRepo.Get(new Uri("urn:oid:2.16.840.1.113883.3.72.5.9.4"));
                if (aa != null)
                    aaRepo.Obsolete(aa.Key.Value);

                // Test harness sends ADT A01 with 2.16.840.1.113883.3.72.5.9.4 as OID
                var message = TestUtil.GetMessageEvent("OHIE-CR-03-10");
                var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

                // Response is ACK A01
                Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AR", "CR");

                // Test harness sends ADT A01 with TEST_BLOCK as AA
                message = TestUtil.GetMessageEvent("OHIE-CR-03-20");
                result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

                // Response is ACK A01
                Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
                Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
                TestUtil.AssertOutcome(result, "AR", "CR");
            }
        }

        /// <summary>
        /// This test ensures that two assigning authorities cannot assign identifiers from the other’s assigning domain. In this test, the harness mimics two authorities (TEST_HARNESS_A and TEST_HARNESS_B). They each register a patient and the harness then verifies that TEST_HARNESS_B does not assign an identifier from TEST_HARNESS_A’s identity domain.
        /// </summary>
        [Test]
        public void TestOhieCr04()
        {
            // Setup: Ensure that TEST_HARNESS_A is created with
            TestUtil.CreateAuthority("TEST_A", "2.16.840.1.113883.3.72.5.9.2", "", "TEST_HARNESS_A", DeviceSecretA);
            // Setup: Ensure that TEST_HARNESS_B is created with
            TestUtil.CreateAuthority("TEST_B", "2.16.840.1.113883.3.72.5.9.3", "", "TEST_HARNESS_B", DeviceSecretB);

            // Step 20 - Harness A sends ADT^A01
            var message = TestUtil.GetMessageEvent("OHIE-CR-04-20", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // TEST HARNESS B attempts to send for authority A
            message = TestUtil.GetMessageEvent("OHIE-CR-04-30", DeviceSecretB);
            result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            TestUtil.AssertOutcome(result, "AR", "CR");
        }

        /// <summary>
        /// This test ensures that the receiver does not reject a message containing only an identifier, and one of gender, date of birth, mother’s identifier. This test makes no assertion about merging/matching patients
        /// </summary>
        [Test]
        public void TestOhieCr05()
        {
            // Setup: Ensure that TEST_HARNESS is created with authority over TEST
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // Ensure that patient is registered with minimal data
            var message = TestUtil.GetMessageEvent("OHIE-CR-05-10", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");
            TestUtil.AssertPatientExists("TEST", "RJ-439");
            // Test harness sends ADT^A01 message with minimal data set
            message = TestUtil.GetMessageEvent("OHIE-CR-05-20", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            TestUtil.AssertOutcome(result, "AA", "CA");
            TestUtil.AssertPatientExists("TEST", "RJ-441");

            // Test harness verifies infant record created
            message = TestUtil.GetMessageEvent("OHIE-CR-05-30");
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Exactly one PID segment
            var resp = result as RSP_K23;
            Assert.IsNotNull(resp.QUERY_RESPONSE);
            Assert.AreEqual("RJ-441", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("ISO", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalIDType.Value);
        }

        /// <summary>
        /// This test ensures that the receiver is able to merge patient data from an assigning authority (TEST_A) which has an national patient identifier (assigning authority NID). 
        /// The demographics data does not match, this is to test that matching is done on explicit identifiers.
        /// </summary>
        [Test]
        public void TestOhieCr06()
        {
            // Setup: Ensure that TEST_HARNESS_A is created with
            TestUtil.CreateAuthority("TEST_A", "2.16.840.1.113883.3.72.5.9.2", "", "TEST_HARNESS_A", DeviceSecretA);
            // Setup: Ensure that NID is created with
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);

            var message = TestUtil.GetMessageEvent("OHIE-CR-06-20", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");
            TestUtil.AssertPatientExists("NID", "NID-000345435");
            message = TestUtil.GetMessageEvent("OHIE-CR-06-30", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");
            TestUtil.AssertPatientExists("TEST_A", "RJ-449");
            TestUtil.AssertPatientExists("NID", "NID-000345435");

            // Verify linkage
            message = TestUtil.GetMessageEvent("OHIE-CR-06-40", DeviceSecretA);
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Verify that only one person is registered with matching identifier
            var rsp = result as RSP_K23;
            Assert.IsNotNull(rsp.QUERY_RESPONSE);
            Assert.AreEqual(3, rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Count());
            Assert.IsTrue(rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "NID" && o.IDNumber.Value == "NID-000345435"), "Missing NID");
            Assert.IsTrue(rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST_A" && o.IDNumber.Value == "RJ-449"), "Missing Local ID");
        }

        /// <summary>
        /// This test ensures that the receiver is able to match an incoming patient with their mother via the “Mother’s Identifier” property. 
        /// In this test, the harness with register a patient (the mother) and subsequently will register an infant record (only dob, gender and id) 
        /// with the mother’s identifier attached. The test will ensure that the link occurred by validating a demographic query contains the mother’s name.
        /// </summary>
        [Test]
        public void TestOhieCr07()
        {
            // Ensure TEST_A is setup
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // Ensure patient is registered
            var message = TestUtil.GetMessageEvent("OHIE-CR-07-10", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Test harness sends minimal data set for newborn
            message = TestUtil.GetMessageEvent("OHIE-CR-07-20", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Verify that the infant was created
            message = TestUtil.GetMessageEvent("OHIE-CR-07-30", DeviceSecretA);
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA");

            var rsp = result as RSP_K23;
            Assert.IsNotNull(rsp.QUERY_RESPONSE);
            Assert.AreEqual(2, rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Count()); // KEY and Infant ID
            Assert.IsTrue(rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST" && o.IDNumber.Value == "RJ-440"), "Missing Local ID");

            // Verify that mother's record wsa linked
            message = TestUtil.GetMessageEvent("OHIE-CR-07-40", DeviceSecretA);
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA");

            // Look for mother's info
            var k21 = result as RSP_K21;
            Assert.AreEqual(1, k21.QUERY_RESPONSERepetitionsUsed);
            Assert.IsTrue(k21.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST" && o.IDNumber.Value == "RJ-440"), "Missing Local ID");
            Assert.AreEqual("JONES", k21.GetQUERY_RESPONSE(0).PID.GetMotherSMaidenName(0).FamilyName.Surname.Value);
            Assert.IsTrue(k21.GetQUERY_RESPONSE(0).PID.GetMotherSIdentifier().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST" && o.IDNumber.Value == "RJ-439"), "Missing Mother's Local ID");
        }

        /// <summary>
        /// This test ensures that the receiver is able to store and usefully convey (regurgitate) a more complete patient record having multiple names, 
        /// addresses, telephone numbers, mother’s identifier, mother’s name, birth date, multiple birth order, etc.
        /// </summary>
        [Test]
        public void TestOhieCr08()
        {
            // Ensure TEST_A is setup
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // Register patient with full demographic information
            var message = TestUtil.GetMessageEvent("OHIE-CR-08-10", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Test harness verifies data by looking up created patient
            message = TestUtil.GetMessageEvent("OHIE-CR-08-30", DeviceSecretA);
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA");

            // Verify the demographics fields were populated correctly
            var k21 = result as RSP_K21;
            Assert.AreEqual(1, k21.QUERY_RESPONSERepetitionsUsed);
            Assert.IsTrue(k21.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST" && o.IDNumber.Value == "RJ-442"), "Missing TEST authority identifier");
            Assert.AreEqual("FOSTER", k21.GetQUERY_RESPONSE(0).PID.GetPatientName(0).FamilyName.Surname.Value.Trim());
            Assert.AreEqual("FANNY", k21.GetQUERY_RESPONSE(0).PID.GetPatientName(0).GivenName.Value.Trim());
            Assert.AreEqual("FULL", k21.GetQUERY_RESPONSE(0).PID.GetPatientName(0).SecondAndFurtherGivenNamesOrInitialsThereof.Value.Trim());
            Assert.AreEqual("FOSTER", k21.GetQUERY_RESPONSE(0).PID.GetMotherSMaidenName(0).FamilyName.Surname.Value);
            Assert.AreEqual("MARY", k21.GetQUERY_RESPONSE(0).PID.GetMotherSMaidenName(0).GivenName.Value);
            Assert.AreEqual("1970", k21.GetQUERY_RESPONSE(0).PID.DateTimeOfBirth.Time.Value);
            Assert.AreEqual("F", k21.GetQUERY_RESPONSE(0).PID.AdministrativeSex.Value);
            Assert.AreEqual("123 W34 St", k21.GetQUERY_RESPONSE(0).PID.GetPatientAddress(0).StreetAddress.StreetOrMailingAddress.Value);
            Assert.AreEqual("FRESNO", k21.GetQUERY_RESPONSE(0).PID.GetPatientAddress(0).City.Value);
            Assert.AreEqual("CA", k21.GetQUERY_RESPONSE(0).PID.GetPatientAddress(0).StateOrProvince.Value);
            Assert.AreEqual("30495", k21.GetQUERY_RESPONSE(0).PID.GetPatientAddress(0).ZipOrPostalCode.Value);
            Assert.AreEqual("PH", k21.GetQUERY_RESPONSE(0).PID.GetPhoneNumberHome(0).TelecommunicationEquipmentType.Value);
            Assert.AreEqual("PRN", k21.GetQUERY_RESPONSE(0).PID.GetPhoneNumberHome(0).TelecommunicationUseCode.Value);
            Assert.AreEqual("PH", k21.GetQUERY_RESPONSE(0).PID.GetPhoneNumberBusiness(0).TelecommunicationEquipmentType.Value);
            Assert.AreEqual("en", k21.GetQUERY_RESPONSE(0).PID.PrimaryLanguage.Identifier.Value.Trim());
            Assert.AreEqual("S", k21.GetQUERY_RESPONSE(0).PID.MaritalStatus.Identifier.Value);
        }

        /// <summary>
        /// In this test, the test harness will register a patient with a local identifier (TEST domain) and will subsequently query the receiver to retrieve the identifiers linked to the newly registered patient.
        /// </summary>
        [Test]
        public void TestOhieCr09()
        {
            // Setup the domain authority of TEST
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // Setup the domain authority of NID
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);

            // Step 1: The test harness verifies that the PIX query handler behaves properly for un-regstered patient
            var message = TestUtil.GetMessageEvent("OHIE-CR-09-10", DeviceSecretA);
            var response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

            // Response should be AE
            TestUtil.AssertOutcome(response, "AE");
            var rsp = response as RSP_K23;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("QPD", rsp.ERR.GetErrorLocation(0).SegmentID.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).SegmentSequence.Value);
            Assert.AreEqual("3", rsp.ERR.GetErrorLocation(0).FieldPosition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).FieldRepetition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).ComponentNumber.Value);

            // Harness sends PIX query for unregistered patient in random domain
            message = TestUtil.GetMessageEvent("OHIE-CR-09-20", DeviceSecretA);
            response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

            // Response should be AE
            TestUtil.AssertOutcome(response, "AE");
            rsp = response as RSP_K23;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("QPD", rsp.ERR.GetErrorLocation(0).SegmentID.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).SegmentSequence.Value);
            Assert.AreEqual("3", rsp.ERR.GetErrorLocation(0).FieldPosition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).FieldRepetition.Value);
            Assert.AreEqual("4", rsp.ERR.GetErrorLocation(0).ComponentNumber.Value);

            // Harness sends registering patient
            message = TestUtil.GetMessageEvent("OHIE-CR-09-30", DeviceSecretA);
            response = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

            // Assert success
            TestUtil.AssertOutcome(response, "AA", "CA");

            // Harness accepts message for xref
            message = TestUtil.GetMessageEvent("OHIE-CR-09-40", DeviceSecretA);
            response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

            // Assert success
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K23;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-443", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("ISO", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalIDType.Value);
        }

        /// <summary>
        /// In this test, the test harness will register a patient with a local identifier (TEST domain). The receiver is the assigning authority 
        /// for the ECID domain and should generate an ECID by whatever means the software performs this task. The test harness will then ask the 
        /// receiver to do a cross reference between the TEST domain and the ECID domain. This test ensures that the receiver adheres to the 
        /// “What Domains Returned” query parameter.
        /// </summary>
        [Test]
        public void TestOhieCr10()
        {
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);

            // Ensure that patient is registered
            var message = TestUtil.GetMessageEvent("OHIE-CR-10-10", DeviceSecretA);
            var response = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA", "CA");

            // Test harness requests that the receiver gives it only TEST identities
            message = TestUtil.GetMessageEvent("OHIE-CR-10-20", DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");
            var rsp = response as RSP_K23;
            Assert.AreEqual(1, rsp.QUERY_RESPONSE.PID.PatientIdentifierListRepetitionsUsed);
            Assert.AreEqual("RJ-444", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().First().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().First().AssigningAuthority.UniversalID.Value);

            // Test harness requests receiver to give it a domain that does not exist
            message = TestUtil.GetMessageEvent("OHIE-CR-10-30", DeviceSecretA);
            response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AE");
            rsp = response as RSP_K23;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("QPD", rsp.ERR.GetErrorLocation(0).SegmentID.Value);
            Assert.AreEqual("4", rsp.ERR.GetErrorLocation(0).FieldPosition.Value);

            // Test harness requests receiver give it a domain identifier from valid domain but for which the patient has no ID
            message = TestUtil.GetMessageEvent("OHIE-CR-10-40", DeviceSecretA);
            response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K23;
            Assert.AreEqual("NF", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSE.PID.PatientIdentifierListRepetitionsUsed);
        }

        /// <summary>
        /// This test case ensures that the recipient of the query can perform a patient demographics query based on the PID-3 values provided in an admit message
        /// </summary>
        [Test]
        public void TestOhieCr11()
        {
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);

            // Ensure that the patient Jennifer Jones with RJ-439 is registered
            var message = TestUtil.GetMessageEvent("OHIE-CR-11-10", DeviceSecretA);
            var response = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA", "CA");

            // Test harness sends PDQ message containing known ID to supplier
            message = TestUtil.GetMessageEvent("OHIE-CR-11-20", DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            var rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(1, rsp.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual(2, rsp.GetQUERY_RESPONSE(0).PID.PatientIdentifierListRepetitionsUsed); // For subsequent query validation. The response layer should respond with UUID and RJ-439

            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("JONES", rsp.GetQUERY_RESPONSE(0).PID.GetPatientName(0).FamilyName.Surname.Value);
            Assert.AreEqual("JENNIFER", rsp.GetQUERY_RESPONSE(0).PID.GetPatientName(0).GivenName.Value);
            Assert.AreEqual("19840125", rsp.GetQUERY_RESPONSE(0).PID.DateTimeOfBirth.Time.Value);

            // Test harness sends PDQ message with identifier that is unknown
            message = TestUtil.GetMessageEvent("OHIE-CR-11-30", DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            rsp = response as RSP_K21;
            Assert.AreEqual("NF", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);

            // Test harness sends invalid PDQ message with invalid filter parameter
            message = TestUtil.GetMessageEvent("OHIE-CR-11-40");
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AE", "AR");

            rsp = response as RSP_K21;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);

            // Test harness sends PDQ message and specified domains that should be returned in QPD-8
            message = TestUtil.GetMessageEvent("OHIE-CR-11-50");
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(1, rsp.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual(1, rsp.GetQUERY_RESPONSE(0).PID.PatientIdentifierListRepetitionsUsed); // We specified what domains returned so there should only be one
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("JONES", rsp.GetQUERY_RESPONSE(0).PID.GetPatientName(0).FamilyName.Surname.Value);
            Assert.AreEqual("JENNIFER", rsp.GetQUERY_RESPONSE(0).PID.GetPatientName(0).GivenName.Value);
            Assert.AreEqual("19840125", rsp.GetQUERY_RESPONSE(0).PID.DateTimeOfBirth.Time.Value);

            // Test harness sends message what domains should be returned. What domains contains a NID which the patient does not have
            // The system should respond with NF
            message = TestUtil.GetMessageEvent("OHIE-CR-11-60");
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            rsp = response as RSP_K21;
            Assert.AreEqual("NF", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);

            // Test harness sends message with an invalid domain specified in what domains returned. The system responds with error
            message = TestUtil.GetMessageEvent("OHIE-CR-11-70");
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AE");

            rsp = response as RSP_K21;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("QPD", rsp.ERR.GetErrorLocation(0).SegmentID.Value);
            Assert.AreEqual("8", rsp.ERR.GetErrorLocation(0).FieldPosition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).SegmentSequence.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);
        }

        /// <summary>
        /// This test ensures that the recipient of the query can perform an exact match on a patient’s name as provided in an admit message.
        /// The test will additionally test partial matching using phonetics and patterns.The recipient must pass one of the phonetic or pattern matching cases.
        /// </summary>
        [Test]
        public void TestOhieCr12()
        {
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", this.DeviceSecretA);
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", this.DeviceSecretA);

            // step 10
            // register patient
            var adtMessageHandler = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>(); 
            
            var actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-12-10", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "CA", "AA");

            // step 20
            // query patient
            var qbpMessageHandler = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>();

            actual = qbpMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-12-20", this.DeviceSecretA));

            // example printing to console
            Console.WriteLine(TestUtil.ToString(actual));

            // perform assertions

            Assert.NotNull(actual);
            Assert.IsInstanceOf<RSP_K21>(actual);

            var result = (RSP_K21) actual;

            Assert.AreEqual("AA", result.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", result.QAK.QueryResponseStatus.Value);
            Assert.IsTrue(result.QUERY_RESPONSEs.Any());
            Assert.AreEqual("RJ-439", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);

            Assert.AreEqual("JONES", result.GetQUERY_RESPONSE(0).PID.GetPatientName(0).FamilyName.Surname.Value);
            Assert.AreEqual("JENNIFER", result.GetQUERY_RESPONSE(0).PID.GetPatientName(0).GivenName.Value);
            Assert.AreEqual("19840125", result.GetQUERY_RESPONSE(0).PID.DateTimeOfBirth.Time.Value);
        }

        /// <summary>
        /// This test ensures that the recipient of the query can perform a query by the patient’s mother’s identifier.
        /// </summary>
        [Test]
        public void TestOhieCr13()
        {
            // Ensure TEST_A is setup
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // Ensure patient is registered
            var message = TestUtil.GetMessageEvent("OHIE-CR-13-10", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Ensure patient's mother is registered
            message = TestUtil.GetMessageEvent("OHIE-CR-13-15", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA", "CA");

            // Test harness sends a query with mother's identifier
            message = TestUtil.GetMessageEvent("OHIE-CR-13-20", DeviceSecretA);
            var response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            var rsp = response as RSP_K21;
            Assert.AreEqual(1, rsp.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual("RJ-440", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);

            // Verify that the infant was created
            message = TestUtil.GetMessageEvent("OHIE-CR-13-30", DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(response, "AA");

            rsp = response as RSP_K21;
            Assert.AreEqual(1, rsp.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual("RJ-440", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
        }

        /// <summary>
        /// This test ensures that the recipient supports the semantics of date matching and approximate matches by date range. This test case will query for
        /// an exact date of birth as provided in an admit message, and a fuzzy date of birth(year, and year/month).
        /// </summary>
        [Test]
        public void TestOhieCr14()
        {
            // step 5
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);

            // step 10 - ensure that the patient is registered
            var actual = TestUtil.GetMessageEvent("OHIE-CR-14-10", this.DeviceSecretA);
            var response = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA", "CA");

            // step 20
            // Test harness sends a query with date of birth precise to the year in which a patient’s date of birth falls.
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-20", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            var rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);

            // step 30
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-30", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);

            // step 40
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-40", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);

            // step 50
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-20", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("NF", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);
        }

        /// <summary>
        /// This test ensures that the recipient of the query can perform a query on a series of demographics fields.
        /// The test harness will perform a query on a series of combinations of parameters such as name + gender, name + date of birth, gender + date of birth.
        /// </summary>
        [Test]
        public void TestOhieCr15()
        {
            // Step 5- set up receiver
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);
            //TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);

            // Step 10 - register patient and check
            var message = TestUtil.GetMessageEvent("OHIE-CR-15-10", DeviceSecretA);
            var result = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>().HandleMessage(message);

            TestUtil.AssertOutcome(result, "AA", "CA");

            // Step 20-  send a query with patient's name and gender
            message = TestUtil.GetMessageEvent("OHIE-CR-15-20", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            var response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", response.QAK.QueryResponseStatus.Value);

            // **is this sufficient to check if only one PID segment is included?
            Assert.AreEqual(1, response.QUERY_RESPONSERepetitionsUsed);

            var pidSegments = response.GetQUERY_RESPONSE().PID.GetPatientIdentifierList();

            // Check that one PID receiver sent only one PID segment with identifier RJ-439 in PID-3
            var matchingIdentifierCount = pidSegments.Count(x => x.IDNumber.Value == "RJ-439");
            Assert.AreEqual(1, matchingIdentifierCount);

            // Check that one PID receiver sent only one PID segment with domain TEST in PID-3
            var matchingDomainCount = pidSegments.Count(x => x.AssigningAuthority.NamespaceID.Value == "TEST");
            Assert.AreEqual(1, matchingDomainCount);

            // **Step 30 - needed to remove repeating segment
            message = TestUtil.GetMessageEvent("OHIE-CR-15-30", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", response.QAK.QueryResponseStatus.Value);


            Assert.AreEqual(1, response.QUERY_RESPONSERepetitionsUsed);

            pidSegments = response.GetQUERY_RESPONSE().PID.GetPatientIdentifierList();

            // Check that one PID receiver sent only one PID segment with identifier RJ-439 in PID-3
            matchingDomainCount = pidSegments.Count(x => x.AssigningAuthority.NamespaceID.Value == "TEST");
            matchingIdentifierCount = pidSegments.Count(x => x.IDNumber.Value == "RJ-439");
            Assert.AreEqual(1, matchingIdentifierCount);

            // **Step 40 - for passing test needed to remove repeating segments and change date to year only in QPD-3
            message = TestUtil.GetMessageEvent("OHIE-CR-15-40", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", response.QAK.QueryResponseStatus.Value);


            Assert.AreEqual(1, response.QUERY_RESPONSERepetitionsUsed);

            pidSegments = response.GetQUERY_RESPONSE().PID.GetPatientIdentifierList();

            // Check that one PID receiver sent only one PID segment with identifier RJ-439 in PID-3
            matchingDomainCount = pidSegments.Count(x => x.AssigningAuthority.NamespaceID.Value == "TEST");
            matchingIdentifierCount = pidSegments.Count(x => x.IDNumber.Value == "RJ-439");
            Assert.AreEqual(1, matchingIdentifierCount);

            // **Step 50 - for passing test needed to remove repeating segments QPD-3
            message = TestUtil.GetMessageEvent("OHIE-CR-15-50", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("NF", response.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, response.QUERY_RESPONSERepetitionsUsed);


            // **Step 60 - for passing test needed to remove repeating segments QPD-3
            message = TestUtil.GetMessageEvent("OHIE-CR-15-60", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("NF", response.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, response.QUERY_RESPONSERepetitionsUsed);
        }

        /// <summary>
        /// This test will ensure that the client registry can appropriately handle a merge condition whereby a local assigning authority notifies the client 
        /// registry of a local merge(two local identifiers are in fact the same person).
        /// </summary>
        [Test]
        public void TestOhieCr16()
        {
            // step 5 
            // set up the receiver
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", this.DeviceSecretA);

            // step 10
            // register patient
            var adtMessageHandler = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>();
            var actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-16-10", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "AA", "CA");

            // step 15
            // register another patient
            adtMessageHandler = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>();
            actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-16-15", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "AA", "CA");

            // step 20
            // query patients
            var qbpMessageHandler = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>();
            actual = qbpMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-16-20", this.DeviceSecretA));

            // perform assertions
            Assert.NotNull(actual);
            Assert.IsInstanceOf<RSP_K21>(actual);

            var result = (RSP_K21)actual;

            Assert.AreEqual("AA", result.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", result.QAK.QueryResponseStatus.Value);
            Assert.IsTrue(result.QUERY_RESPONSEs.Any());

            Assert.AreEqual(2, result.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual("RJ-999", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("RJ-439", result.GetQUERY_RESPONSE(1).PID.GetPatientIdentifierList().First().IDNumber.Value);
            Assert.AreEqual("TEST", result.GetQUERY_RESPONSE(1).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);

            // step 30
            // merge identifier RJ-999 into record RJ-439
            adtMessageHandler = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>();
            actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-16-30", this.DeviceSecretA));

            TestUtil.AssertOutcome(actual, "AA");

            // step 40
            // merged using PIX query
            var message = TestUtil.GetMessageEvent("OHIE-CR-16-40", DeviceSecretA);
            var response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

            // Assert success
            TestUtil.AssertOutcome(response, "AA");
            var rsp = response as RSP_K23;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().First().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("RJ-999", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);

            // step 50
            // verifies old identifier is de-referenced from patient record
            message = TestUtil.GetMessageEvent("OHIE-CR-16-50", DeviceSecretA);
            response = new PixQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);

            // Response should be AE
            TestUtil.AssertOutcome(response, "AE");
            rsp = response as RSP_K23;
            Assert.AreEqual("AE", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("QPD", rsp.ERR.GetErrorLocation(0).SegmentID.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).SegmentSequence.Value);
            Assert.AreEqual("3", rsp.ERR.GetErrorLocation(0).FieldPosition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).FieldRepetition.Value);
            Assert.AreEqual("1", rsp.ERR.GetErrorLocation(0).ComponentNumber.Value);

            // step 60
            // verify there are still two Jennifer Jones in the target 
            qbpMessageHandler = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>();
            actual = qbpMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-16-60", this.DeviceSecretA));

            // perform assertions
            Assert.NotNull(actual);
            Assert.IsInstanceOf<RSP_K21>(actual);

            result = (RSP_K21)actual;

            Assert.AreEqual("AA", result.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", result.QAK.QueryResponseStatus.Value);
            Assert.IsTrue(result.QUERY_RESPONSEs.Any());

            Assert.AreEqual(2, result.QUERY_RESPONSERepetitionsUsed);
            Assert.AreEqual("RJ-999", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", result.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().First().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("RJ-439", result.GetQUERY_RESPONSE(1).PID.GetPatientIdentifierList().First().IDNumber.Value);
            Assert.AreEqual("TEST", result.GetQUERY_RESPONSE(1).PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);

        }
    }
}