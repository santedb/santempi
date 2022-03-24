using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHapi.Model.V25.Message;
using NUnit.Framework;
using SanteDB.Core;
using SanteDB.Core.Services;
using SanteDB.Core.TestFramework;
using SanteMPI.Messaging.IHE.HL7;

namespace SanteMPI.Messaging.IHE.Test
{
    [ExcludeFromCodeCoverage]
    [TestFixture(Category = "Integration")]
    public class TestOhieCr13 : DataTest
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
        /// This test ensures that the recipient of the query can perform a query by the patient’s mother’s identifier.
        /// </summary>
        [Test]
        public void TestOhieCr13_()
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
            result = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(message);
            TestUtil.AssertOutcome(result, "AA");
            
            var rst = result as RSP_K23;
            Assert.IsNotNull(rst.QUERY_RESPONSE);
            Assert.AreEqual(2, rst.QUERY_RESPONSE.PID.GetPatientIdentifierList().Count()); // KEY and Infant ID
            Assert.IsTrue(rst.QUERY_RESPONSE.PID.GetPatientIdentifierList().Any(o => o.AssigningAuthority.NamespaceID.Value == "TEST" && o.IDNumber.Value == "RJ-440"), "Missing Local ID");
        }
    }
}