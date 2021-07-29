using Hl7.Fhir.Model;
using NUnit.Framework;
using SanteDB.Core;
using SanteDB.Core.Interfaces;
using SanteDB.Core.Model.DataTypes;
using SanteDB.Core.Model.Security;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Core.TestFramework;
using SanteDB.Messaging.FHIR.Exceptions;
using SanteDB.Messaging.FHIR.Handlers;
using SanteDB.Messaging.FHIR.Rest;
using SanteDB.Messaging.FHIR.Util;
using SanteMPI.Messaging.IHE.FHIR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SanteMPI.Messaging.IHE.Test
{
    /// <summary>
    /// Test that functions are operating as expected
    /// </summary>
    [TestFixture]
    public class TestPMIR : DataTest
    {

        // Device secret
        private readonly byte[] HarnessSecret = System.Text.Encoding.UTF8.GetBytes("TEST_HARNESS");

        // Bundler 
        private IServiceManager m_serviceManager;

        // App identity provider
        private IApplicationIdentityProviderService m_applicationIdentityProviderService;

        /// <summary>
        /// Test context
        /// </summary>
        /// <param name="context"></param>
        [OneTimeSetUp]
        public void Initialize()
        {
            // Force load of the DLL
            var p = FirebirdSql.Data.FirebirdClient.FbCharset.Ascii;
            TestApplicationContext.TestAssembly = typeof(TestPMIR).Assembly;
            TestApplicationContext.Initialize(TestContext.CurrentContext.TestDirectory);
            this.m_serviceManager = ApplicationServiceContext.Current.GetService<IServiceManager>();
            this.m_applicationIdentityProviderService = ApplicationServiceContext.Current.GetService<IApplicationIdentityProviderService>();
            
            
            var testConfiguration = new SanteDB.Messaging.FHIR.Configuration.FhirServiceConfigurationSection()
            {
                Resources = new System.Collections.Generic.List<string>()
                {
                    "Patient",
                    "Bundle",
                    "RelatedPerson",
                    "Practitioner",
                    "Organization"
                },
                OperationHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>(),
                ExtensionHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>()
                {
                    new SanteDB.Core.Configuration.TypeReferenceConfiguration(typeof(MothersMaidenNameExtension))
                },
                ProfileHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>(),
                BehaviorModifiers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>()
                {
                    new SanteDB.Core.Configuration.TypeReferenceConfiguration(typeof(PatientDemographicsQueryModifier))
                },
                MessageHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>()
                {
                    new SanteDB.Core.Configuration.TypeReferenceConfiguration(typeof(PatientMasterIdentityOperation))
                }
            };

            using (AuthenticationContext.EnterSystemContext())
            {
                FhirResourceHandlerUtil.Initialize(testConfiguration, this.m_serviceManager);
                ExtensionUtil.Initialize(testConfiguration);
            }

        }

        /// <summary>
        /// Test OpenHIE CR 01 FHIR
        /// </summary>
        [Test]
        public void TestOhieCr01Fhir()
        {
            // Test harness sends a mal-formed message
            try
            {
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-01-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                Assert.Fail();
            }
            catch (FhirException e)
            {
                Assert.AreEqual(HttpStatusCode.BadRequest, e.Status);
            }
        }

        /// <summary>
        /// Test OpenHIE CR 02 FHIR
        /// </summary>
        [Test]
        public void TestOhieCr02Fhir()
        {

            // Create TEST Domain
            TestUtil.CreateAuthority("TEST_FHIR", "1.3.6.1.4.1.52820.3.72.5.9.1", "http://ohie.org/test/test", "TEST_HARNESS_FHIR", HarnessSecret);

            // Authenticate as TEST HARNESS
            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR", HarnessSecret))
            {

                // Register Olly Oid
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-02-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Query for Olly Oid
                var patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test|FHR-403");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual("OID", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Family);
                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);

                // Register Uma URL
                rqo = TestUtil.GetFhirMessage("OHIE-CR-02-30");
                Assert.IsInstanceOf<Bundle>(rqo);
                response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out oo);
                Assert.IsTrue(oo.Success);

                // Query for Uma Url
                patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "urn:oid:1.3.6.1.4.1.52820.3.72.5.9.1|FHR-404");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual("URL", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Family);
                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
            }

        }

        /// <summary>
        /// Tests the rejection of messages which contain identifiers not known to the server
        /// </summary>
        [Test]
        public void TestOhieCr03Fhir()
        {

            using (AuthenticationContext.EnterSystemContext())
            {
                var idService = ApplicationServiceContext.Current.GetService<IRepositoryService<AssigningAuthority>>();
                var idDomain = idService.Find(o => o.Url == "http://ohie.org/test/test_block" && o.ObsoletionTime == null, 0, 1, out int total);
                if (total > 0)
                {
                    idService.Obsolete(idDomain.First().Key.Value);
                }
                idDomain = idService.Find(o => o.Oid == "1.3.6.1.4.1.52820.3.72.5.9.4" && o.ObsoletionTime == null, 0, 1, out total);
                if (total > 0)
                {
                    idService.Obsolete(idDomain.First().Key.Value);
                }

                // Register via URL 
                try
                {
                    var rqo = TestUtil.GetFhirMessage("OHIE-CR-03-10");
                    Assert.IsInstanceOf<Bundle>(rqo);
                    this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                    Assert.Fail("Should throw exception");
                }
                catch (FhirException e)
                {
                    var response = DataTypeConverter.CreateErrorResult(e);
                    TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.FatalError, out OperationOutcome oo);
                    Assert.IsFalse(oo.Success);
                    Assert.IsTrue(oo.Issue.Any(i => i.Diagnostics.Contains("http://ohie.org/test/test_block")));
                }
                catch
                {
                    Assert.Fail("Improper exception type");
                }

                // Rergister via OID
                try
                {
                    var rqo = TestUtil.GetFhirMessage("OHIE-CR-03-20");
                    Assert.IsInstanceOf<Bundle>(rqo);
                    this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                    Assert.Fail("Should throw exception");
                }
                catch (FhirException e)
                {
                    var response = DataTypeConverter.CreateErrorResult(e);
                    TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.FatalError, out OperationOutcome oo);
                    Assert.IsFalse(oo.Success);
                    Assert.IsTrue(oo.Issue.Any(i => i.Diagnostics.Contains("1.3.6.1.4.1.52820.3.72.5.9.4")));
                }
                catch
                {
                    Assert.Fail("Improper exception type thrown");
                }

            }
        }

        /// <summary>
        /// Test OpenHIE CR-04 - Ensure identity domain protections are used
        /// </summary>
        [Test]
        public void TestOhieCr04Fhir()
        {
            TestUtil.CreateAuthority("TEST_FHIR_A", "1.3.6.1.4.1.52820.3.72.5.9.2", "http://ohie.org/test/test_a", "TEST_HARNESS_FHIR_A", HarnessSecret);
            TestUtil.CreateAuthority("TEST_FHIR_B", "1.3.6.1.4.1.52820.3.72.5.9.3", "http://ohie.org/test/test_b", "TEST_HARNESS_FHIR_B", HarnessSecret);
            var patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);


            // Authenticate as TEST HARNESS_A
            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR_A", HarnessSecret))
            {

                // Register patient 
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-04-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_a|FHRA-0392");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual("http://ohie.org/test/test_a", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
            }

            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR_B", HarnessSecret))
            {

                // Attempt to register patient in wrong id domain
                try
                {
                    var rqo1 = TestUtil.GetFhirMessage("OHIE-CR-04-20");
                    Assert.IsInstanceOf<Bundle>(rqo1);
                    this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo1, SanteDB.Core.Services.TransactionMode.Commit);
                    Assert.Fail("Should not allow assignment");
                }
                catch (FhirException e)
                {
                    var response1 = DataTypeConverter.CreateErrorResult(e);
                    TestUtil.AssertFhirOutcome<OperationOutcome>(response1, MessageHeader.ResponseType.FatalError, out OperationOutcome oo1);
                    Assert.IsFalse(oo1.Success);
                }
                catch
                {
                    Assert.Fail("Incorrect exception type");
                }

                // Attempt to register a patient with an existing identifier in a domain we can't assign to
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-04-30");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_b|FHRB-4736");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.IsTrue(queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.Any(o => o.System == "http://ohie.org/test/test_a" && o.Value == "FHRA-0392"));
                Assert.IsTrue(queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.Any(o => o.System == "http://ohie.org/test/test_b" && o.Value == "FHRB-4736"));
            }
        }


        /// <summary>
        /// Tests registration of mother/baby pairs
        /// </summary>
        [Test]
        public void TestOhieCr05Fhir()
        {

            // Create TEST Domain
            TestUtil.CreateAuthority("TEST_FHIR", "1.3.6.1.4.1.52820.3.72.5.9.1", "http://ohie.org/test/test", "TEST_HARNESS_FHIR", HarnessSecret);

            // Authenticate as TEST HARNESS
            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR", HarnessSecret))
            {

                // Register the mother/child demographics where
                // mother is just a related person
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-05-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created and has a related person
                var patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test|FHR-4956");
                query.Add("_revinclude", "RelatedPerson:patient");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(2, queryResult.Entry.Count); // patient + mother

                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
                Assert.AreEqual("WIN MINH", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Given.First());
                Assert.AreEqual("FHR-4956", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().Value);
                Assert.AreEqual("SU MYAT LWIN", queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Name.First().Given.First());

                // Register Mother Patient and Newborn Demographics in Tx bundle
                rqo = TestUtil.GetFhirMessage("OHIE-CR-05-20");
                Assert.IsInstanceOf<Bundle>(rqo);
                response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out oo);
                Assert.IsTrue(oo.Success);

                // Validate the newborn record
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test|FHR-4837");
                query.Add("_revinclude", "RelatedPerson:patient");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(2, queryResult.Entry.Count); // patient + mother
                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
                Assert.AreEqual(new Date(2021, 04, 25), queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().BirthDateElement);
                Assert.AreEqual(AdministrativeGender.Female, queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Gender);
                Assert.AreEqual("FHR-4837", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().Value);
                Assert.AreEqual("Sarah Abels", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Extension.First(o => o.Url == "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName").Value.ToString());
                // Validate mother RP
                Assert.AreEqual("Sarah", queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Name.First().Given.First());
                Assert.AreEqual("Abels", queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Name.First().Family);
                Assert.AreEqual("FHR-0844", queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Identifier.First().Value);
                Assert.AreEqual(AdministrativeGender.Female, queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Gender);

                // Query for the mother's patient :)
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test|FHR-0844");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);

                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
                Assert.AreEqual("Sarah", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Given.First());
                Assert.AreEqual("Abels", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Family);
                Assert.AreEqual(AdministrativeGender.Female, queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Gender);
                Assert.AreEqual("FHR-0844", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().Value);

                // Query for PDQm - Mother's Maiden Name
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("mothersMaidenName", "Abels");
                query.Add("_revinclude", "RelatedPerson:patient");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(2, queryResult.Entry.Count); // patient + mother
                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
                Assert.AreEqual(new Date(2021, 04, 25), queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().BirthDateElement);
                Assert.AreEqual(AdministrativeGender.Female, queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Gender);
                Assert.AreEqual("FHR-4837", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().Value);
            }
        }

        /// <summary>
        /// Tests the processing of the OHIE CR 07 FHIR Message
        /// </summary>
        [Test]
        public void TestOhieCr07Fhir()
        {

            // Create TEST Domain
            TestUtil.CreateAuthority("TEST_FHIR", "1.3.6.1.4.1.52820.3.72.5.9.1", "http://ohie.org/test/test", "TEST_HARNESS_FHIR", HarnessSecret);
            TestUtil.CreateAuthority("TEST_ORGS", "1.3.6.1.4.1.52820.3.72.5.9.20", "http://ohie.org/test/orgs", null,null);
            TestUtil.CreateAuthority("TEST_PROVIDERS", "1.3.6.1.4.1.52820.3.72.5.9.21", "http://ohie.org/test/practs", null,null);
            // NOTE: This differs from the standard OHIE test in that the domain name is different because
            // HL7v2 tests ensure that the NID cannot be assigned by anything other than the NID_AUTH device
            TestUtil.CreateAuthority("NID_FHIR", "2.16.840.1.113883.3.72.5.9.9.2", "http://ohie.org/test/nid", null, null);

            // Authenticate as TEST HARNESS
            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR", HarnessSecret))
            {

                // Register the mother/child demographics where
                // mother is just a related person
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-07-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created and has a related person
                var patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test|FHR-070");
                query.Add("_revinclude", "RelatedPerson:patient");
                query.Add("_include", "Organization:managingOrganization");
                query.Add("_include", "Practitioner:generalPractitioner");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(4, queryResult.Entry.Count); // patient + wife + managing org + gp

                Assert.AreEqual("http://ohie.org/test/test", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().System);
                Assert.AreEqual("Flynn", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Name.First().Given.First());
                Assert.AreEqual("FHR-070", queryResult.Entry.Select(o => o.Resource).OfType<Patient>().First().Identifier.First().Value);
                Assert.AreEqual("Allison", queryResult.Entry.Select(o => o.Resource).OfType<RelatedPerson>().First().Name.First().Given.First());

            }
        }

        /// <summary>
        /// Tests the processing of the OHIE CR 07 FHIR Message
        /// </summary>
        [Test]
        public void TestOhieCr08Fhir()
        {

            // Create TEST Domain
            TestUtil.CreateAuthority("TEST_FHIR_A", "1.3.6.1.4.1.52820.3.72.5.9.2", "http://ohie.org/test/test_a", "TEST_HARNESS_FHIR_A", HarnessSecret);
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "http://ohie.org/test/nid", null, null);

            // Authenticate as TEST HARNESS_A
            using (TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR_A", HarnessSecret))
            {

                // Register the first patient
                var rqo = TestUtil.GetFhirMessage("OHIE-CR-08-10");
                Assert.IsInstanceOf<Bundle>(rqo);
                var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out OperationOutcome oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created and has a related person
                var patientHandler = FhirResourceHandlerUtil.GetResourceHandler(ResourceType.Patient);
                var query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_a|FHRA-080");
                var queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                var survivor = queryResult.Entry.First();

                // Register second patient
                rqo = TestUtil.GetFhirMessage("OHIE-CR-08-20");
                Assert.IsInstanceOf<Bundle>(rqo);
                response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out oo);
                Assert.IsTrue(oo.Success);

                // Validate the patient is created and has a related person
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_a|FHRA-081");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                var victim = queryResult.Entry.First();

                // Query based on old identifier should return no results
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("_id", victim.Resource.Id);
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);

                // Merge the patients together
                rqo = TestUtil.GetFhirMessage("OHIE-CR-08-30");
                Assert.IsInstanceOf<Bundle>(rqo);
                response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
                TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.Ok, out oo);
                Assert.IsTrue(oo.Success);

                // Query for FHRA-080 should resolve to suvivor
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_a|FHRA-080");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(survivor.Resource.Id, queryResult.Entry.First().Resource.Id);

                // Query for FHRA-081 should resolve to survivor
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("identifier", "http://ohie.org/test/test_a|FHRA-081");
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(1, queryResult.Total);
                Assert.AreEqual(survivor.Resource.Id, queryResult.Entry.First().Resource.Id);
                Assert.AreEqual(2, (queryResult.Entry.First().Resource as Patient).Identifier.Count);

                // Direct load for FHRA-081 patient (by UUID) should return 404 or an inactive object
                try
                {
                    var obsoleted = patientHandler.Read(victim.Resource.Id, null);
                    Assert.Fail("Should not be here");
                }
                catch(KeyNotFoundException)
                {
                }
                catch(FhirException e) when (e.Status == HttpStatusCode.NotFound)
                { 
                }
                catch
                {
                    Assert.Fail("Wrong exception type");
                }

                // Query based on old identifier should return no results
                query = new System.Collections.Specialized.NameValueCollection();
                query.Add("_id", victim.Resource.Id);
                queryResult = patientHandler.Query(query);
                Assert.AreEqual(0, queryResult.Total);
            }
        }

    }
}
