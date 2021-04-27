using Hl7.Fhir.Model;
using NUnit.Framework;
using SanteDB.Core;
using SanteDB.Core.Interfaces;
using SanteDB.Core.Model.Security;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Core.TestFramework;
using SanteDB.Messaging.FHIR.Handlers;
using SanteDB.Messaging.FHIR.Rest;
using SanteDB.Messaging.FHIR.Util;
using SanteMPI.Messaging.IHE.FHIR;
using System.Linq;

namespace SanteMPI.Messaging.IHE.Test
{
    /// <summary>
    /// Test that functions are operating as expected
    /// </summary>
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
        [SetUp]
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
                    "RelatedPerson"
                },
                OperationHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>(),
                ExtensionHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>(),
                ProfileHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>(),
                MessageHandlers = new System.Collections.Generic.List<SanteDB.Core.Configuration.TypeReferenceConfiguration>()
                {
                    new SanteDB.Core.Configuration.TypeReferenceConfiguration(typeof(PatientMasterIdentityOperation))
                }
            };

            FhirResourceHandlerUtil.Initialize(testConfiguration, this.m_serviceManager);
            ExtensionUtil.Initialize(testConfiguration);
        }

        /// <summary>
        /// Test OpenHIE CR 01 FHIR
        /// </summary>
        [Test]
        public void TestOhieCr01Fhir()
        {
            // Test harness sends a mal-formed message
            var rqo = TestUtil.GetFhirMessage("OHIE-CR-01-10");
            Assert.IsInstanceOf<Bundle>(rqo);
            var response = this.m_serviceManager.CreateInjected<BundleResourceHandler>().Create(rqo, SanteDB.Core.Services.TransactionMode.Commit);
            TestUtil.AssertFhirOutcome<OperationOutcome>(response, MessageHeader.ResponseType.FatalError, out OperationOutcome oo);
            Assert.AreEqual(false, oo.Success);
            Assert.GreaterOrEqual(1, oo.Issue.Count);
        }

        /// <summary>
        /// Test OpenHIE CR 02 FHIR
        /// </summary>
        [Test]
        public void TestOhieCr02Fhir()
        {

            // Create TEST Domain
            TestUtil.CreateAuthority("TEST", "1.3.6.1.4.1.52820.3.72.5.9.1", "http://ohie.org/test/test", "TEST_HARNESS_FHIR", HarnessSecret);

            // Authenticate as TEST HARNESS
            TestUtil.AuthenticateFhir("TEST_HARNESS_FHIR", HarnessSecret);

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
            Assert.AreEqual(1, queryResult.TotalResults);
            Assert.AreEqual("OID", queryResult.Results.OfType<Patient>().First().Name.First().Family);
            Assert.AreEqual("http://ohie.org/test/test", queryResult.Results.OfType<Patient>().First().Identifier.First().System);

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
            Assert.AreEqual(1, queryResult.TotalResults);
            Assert.AreEqual("URL", queryResult.Results.OfType<Patient>().First().Name.First().Family);
            Assert.AreEqual("http://ohie.org/test/test", queryResult.Results.OfType<Patient>().First().Identifier.First().System);

        }
    }
}
