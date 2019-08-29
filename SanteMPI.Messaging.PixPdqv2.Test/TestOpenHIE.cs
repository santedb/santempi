using System;
using System.Linq;
using System.Security.Principal;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHapi.Base.Parser;
using NHapi.Model.V25.Message;
using NHapi.Model.V25.Segment;
using SanteDB.Core;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Claims;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Core.TestFramework;
using SanteDB.Messaging.HL7.Messages;
using SanteMPI.Messaging.PixPdqv2.Messages;

namespace SanteMPI.Messaging.PixPdqv2.Test
{
    [DeploymentItem(@"santedb_test.fdb")]
    [DeploymentItem(@"fbclient.dll")]
    [DeploymentItem(@"firebird.conf")]
    [DeploymentItem(@"firebird.msg")]
    [DeploymentItem(@"ib_util.dll")]
    [DeploymentItem(@"icudt52.dll")]
    [DeploymentItem(@"icudt52l.dat")]
    [DeploymentItem(@"icuin52.dll")]
    [DeploymentItem(@"icuuc52.dll")]
    [DeploymentItem(@"plugins\engine12.dll", "plugins")]
    [DeploymentItem(@"FirebirdSql.Data.FirebirdClient.dll")]
    [TestClass]
    public class TestOpenHIE : DataTest
    {

        // Device secret
        private readonly byte[] DeviceSecretA = new byte[] { 0x1, 0x2, 0x3, 0x4, 0x5, 0x6 };
        private readonly byte[] DeviceSecretB = new byte[] { 0x6, 0x5, 0x4, 0x3, 0x2, 0x1 };

        /// <summary>
        /// Initialize SanteMPI Test Context
        /// </summary>
        /// <param name="context">The context to be initialized</param>
        [ClassInitialize]
        public static void Initialize(TestContext context)
        {
            if(ApplicationServiceContext.Current == null)
            {
                
                TestApplicationContext.TestAssembly = typeof(TestOpenHIE).Assembly;
                TestApplicationContext.Initialize(context.DeploymentDirectory);
            }
        }


        /// <summary>
        /// This test validates that the Client Registry rejects a poorly formed message lacking appropriate assigner information in PID-3.
        /// </summary>
        [TestMethod]
        public void TestOhieCr01()
        {
            // Step 1: Test harness sends ADT^A01 message where CX.4 of PID is missing
            var message = TestUtil.GetMessageEvent("OHIE-CR-01-10");
            var result = new PixAdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);

            // Receiver rejects message with AR or AE
            Assert.IsTrue(new String[] { "AR", "CR", "CE", "AE" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

        }

        /// <summary>
        /// This test validates that the Client Registry is capable of populating the CX.4.1 from CX.4.2 and CX.4.3 or vice-versa given partial data in the CX.4 field.
        /// </summary>
        [TestMethod]
        public void TestOhieCr02()
        {

            // Pre-Conditions: Setup receiver so that OID is configured
            AuthenticationContext.Current = new AuthenticationContext(AuthenticationContext.SystemPrincipal);
            var aaService = ApplicationContext.Current.GetService<IAssigningAuthorityRepositoryService>();
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "TEST_HARNESS", DeviceSecretA);
            var aa = aaService.Get("TEST");
            if (aa == null)
                aaService.Insert(new SanteDB.Core.Model.DataTypes.AssigningAuthority("TEST", "TEST", "2.16.840.1.113883.3.72.5.9.1"));

            // Test harness sends ADT^A01 Message where CX.4.1 of PID is missing by message containss 4.2 and 4.3
            var message = TestUtil.GetMessageEvent("OHIE-CR-02-10", DeviceSecretA);
            var result = new PixAdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // MSH-5 and MSH-6 match
            Assert.AreEqual("TEST_HARNESS", (result.GetStructure("MSH") as MSH).ReceivingApplication.NamespaceID.Value);
            Assert.AreEqual("TEST", (result.GetStructure("MSH") as MSH).ReceivingFacility.NamespaceID.Value);

            // Test harness ensures that patient was registered and receiver has populated 4.1, 4.2, and 4.3
            message = TestUtil.GetMessageEvent("OHIE-CR-02-20", DeviceSecretA);
            result = new QbpMessageHandler().HandleMessage(message);

            // Response is RSP K23
            Assert.AreEqual("RSP", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("K23", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Exactly one PID segment
            var resp = result as RSP_K23;
            Assert.IsNotNull(resp.QUERY_RESPONSE);
            Assert.AreEqual("TEST", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("ISO", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalIDType.Value);

            // Test hanress sneds ADT A01 with OID missing but namespace
            message = TestUtil.GetMessageEvent("OHIE-CR-02-30", DeviceSecretA);
            result = new AdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // MSH-5 and MSH-6 match
            Assert.AreEqual("TEST_HARNESS", (result.GetStructure("MSH") as MSH).ReceivingApplication.NamespaceID.Value);
            Assert.AreEqual("TEST", (result.GetStructure("MSH") as MSH).ReceivingFacility.NamespaceID.Value);

            // Test harnerss validates patient was registrered and populated segments properly
            message = TestUtil.GetMessageEvent("OHIE-CR-02-40", DeviceSecretA);
            result = new QbpMessageHandler().HandleMessage(message);

            // Response is RSP K23
            Assert.AreEqual("RSP", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("K23", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Exactly one PID segment
            resp = result as RSP_K23;
            Assert.IsNotNull(resp.QUERY_RESPONSE);
            Assert.AreEqual("TEST", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Skip(1).First().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Skip(1).First().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("ISO", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Skip(1).First().AssigningAuthority.UniversalIDType.Value);

        }

        /// <summary>
        /// This test ensures that the receiver rejects messages which contain identifiers assigned from authorities which are unknown.
        /// </summary>
        [TestMethod]
        public void TestOhieCr03()
        {

            // Remove any reference to TEST_BLOCK or OID 2.16.840.1.113883.3.72.5.9.4 
            var aaRepo = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();
            var aa = aaRepo.Get("TEST_BLOCK");
            if (aa != null)
                aaRepo.Obsolete(aa.Key.Value);
            aa = aaRepo.Get(new Uri("urn:oid:2.16.840.1.113883.3.72.5.9.4"));
            if (aa != null)
                aaRepo.Obsolete(aa.Key.Value);

            // Test harness sends ADT A01 with 2.16.840.1.113883.3.72.5.9.4 as OID
            var message = TestUtil.GetMessageEvent("OHIE-CR-03-10");
            var result = new PixAdtMessageHandler().HandleMessage(message);
            
            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AR", "CR" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Test harness sends ADT A01 with TEST_BLOCK as AA
            message = TestUtil.GetMessageEvent("OHIE-CR-03-20");
            result = new PixAdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AR", "CR" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));


        }

        /// <summary>
        /// This test ensures that two assigning authorities cannot assign identifiers from the other’s assigning domain. In this test, the harness mimics two authorities (TEST_HARNESS_A and TEST_HARNESS_B). They each register a patient and the harness then verifies that TEST_HARNESS_B does not assign an identifier from TEST_HARNESS_A’s identity domain.
        /// </summary>
        [TestMethod]
        public void TestOhieCr04()
        {

            // Setup: Ensure that TEST_HARNESS_A is created with 
            TestUtil.CreateAuthority("TEST_A", "2.16.840.1.113883.3.72.5.9.2", "TEST_HARNESS_A", DeviceSecretA);
            // Setup: Ensure that TEST_HARNESS_B is created with 
            TestUtil.CreateAuthority("TEST_B", "2.16.840.1.113883.3.72.5.9.3", "TEST_HARNESS_B", DeviceSecretB);

            // Step 20 - Harness A sends ADT^A01
            var message = TestUtil.GetMessageEvent("OHIE-CR-04-20", DeviceSecretA);
            var result = new PixAdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // TEST HARNESS B attempts to send for authority A
            message = TestUtil.GetMessageEvent("OHIE-CR-04-30", DeviceSecretB);
            result = new PixAdtMessageHandler().HandleMessage(message);

            // Response is ACK A01
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AR", "CR" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

        }

        /// <summary>
        /// This test ensures that the receiver does not reject a message containing only an identifier, and one of gender, date of birth, mother’s identifier. This test makes no assertion about merging/matching patients
        /// </summary>
        [TestMethod]
        public void TestOhieCr05()
        {
            // Setup: Ensure that TEST_HARNESS is created with authority over TEST
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "TEST_HARNESS", DeviceSecretA);

            // Ensure that patient is registered with minimal data
            var message = TestUtil.GetMessageEvent("OHIE-CR-05-10", DeviceSecretA);
            var result = new PixAdtMessageHandler().HandleMessage(message);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Test harness sends ADT^A01 message with minimal data set
            message = TestUtil.GetMessageEvent("OHIE-CR-05-20", DeviceSecretA);
            result = new PixAdtMessageHandler().HandleMessage(message);
            Assert.AreEqual("ACK", (result.GetStructure("MSH") as MSH).MessageType.MessageCode.Value);
            Assert.AreEqual("A01", (result.GetStructure("MSH") as MSH).MessageType.TriggerEvent.Value);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Test harness verifies infant record created 
            message = TestUtil.GetMessageEvent("OHIE-CR-05-30");
            result = new QbpMessageHandler().HandleMessage(message);
           
            // Exactly one PID segment
            var resp = result as RSP_K23;
            Assert.IsNotNull(resp.QUERY_RESPONSE);
            Assert.AreEqual("RJ-441", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().IDNumber.Value);
            Assert.AreEqual("TEST", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.NamespaceID.Value);
            Assert.AreEqual("2.16.840.1.113883.3.72.5.9.1", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalID.Value);
            Assert.AreEqual("ISO", resp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Last().AssigningAuthority.UniversalIDType.Value);

        }

        /// <summary>
        /// This test ensures that the receiver is able to merge patient data from an assigning authority (TEST_A) which has an national patient identifier (assigning authority NID). The demographics data does not match, this is to test that matching is done on explicit identifiers.
        /// </summary>
        [TestMethod]
        public void TestOhieCr06()
        {

            // Setup: Ensure that TEST_HARNESS_A is created with 
            TestUtil.CreateAuthority("TEST_A", "2.16.840.1.113883.3.72.5.9.2", "TEST_HARNESS_A", DeviceSecretA);
            // Setup: Ensure that NID is created with 
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "NID_AUTH", DeviceSecretA);

            var message = TestUtil.GetMessageEvent("OHIE-CR-06-20", DeviceSecretA);
            var result = new PixAdtMessageHandler().HandleMessage(message);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            message = TestUtil.GetMessageEvent("OHIE-CR-06-30", DeviceSecretA);
            result = new PixAdtMessageHandler().HandleMessage(message);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Verify linkage
            message = TestUtil.GetMessageEvent("OHIE-CR-06-40", DeviceSecretA);
            result = new QbpMessageHandler().HandleMessage(message);
            Assert.IsTrue(new String[] { "AA", "CA" }.Any(a => a == (result.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(result));

            // Verify that only one person is registered with matching identifier
            var rsp = result as RSP_K23;
            Assert.IsNotNull(rsp.QUERY_RESPONSE);
            Assert.AreEqual(3, rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Count());
            Assert.IsTrue(rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o=>o.AssigningAuthority.NamespaceID.Value == "NID" && o.IDNumber.Value == "NID-000345435"), "Misisng NID");
            Assert.IsTrue(rsp.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST_A" && o.IDNumber.Value == "RJ-449"), "Missing Local ID");



        }

    }
}
