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
    public class TestOhieCr14 : DataTest
    {
        // Device secret
        private readonly byte[] DeviceSecretA = new byte[] {0x1, 0x2, 0x3, 0x4, 0x5, 0x6};

        private readonly byte[] DeviceSecretB = new byte[] {0x6, 0x5, 0x4, 0x3, 0x2, 0x1};

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

        [Test]
        public void TestOhieCr14_()
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

            // step 30
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-30", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);

            // step 40
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-40", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("OK", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual("RJ-439", rsp.GetQUERY_RESPONSE(0).PID.GetPatientIdentifierList().Last().IDNumber.Value);

            // step 50
            actual = TestUtil.GetMessageEvent("OHIE-CR-14-20", this.DeviceSecretA);
            response = new PdqQbpMessageHandler(new TestLocalizationService()).HandleMessage(actual);
            TestUtil.AssertOutcome(response, "AA");
            rsp = response as RSP_K21;
            Assert.AreEqual("NF", rsp.QAK.QueryResponseStatus.Value);
            Assert.AreEqual(0, rsp.QUERY_RESPONSERepetitionsUsed);
        }
    }
}
