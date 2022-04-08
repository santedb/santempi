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
    class TestOhieCr17 : DataTest
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

        [Test]
        public void TestOhieCr17_()
        {
            // Step 5 Set up Receiver
            TestUtil.CreateAuthority("TEST_A", "2.16.840.1.113883.3.72.5.9.2", "", "TEST_HARNESS_A", DeviceSecretA);
            // Set 10 Set up Receiver
            TestUtil.CreateAuthority("TEST_B", "2.16.840.1.113883.3.72.5.9.3", "", "TEST_HARNESS_B", DeviceSecretB);

            // Step 15 Register patient
            var adtMessageHandler = this.m_serviceManager.CreateInjected<PixAdtMessageHandler>();
            var actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-15", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "AA", "CA");

            // Step 20 Register patient 
            actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-20", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "AA", "CA");

            // Step 25
            actual = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-25", this.DeviceSecretA));
            TestUtil.AssertOutcome(actual, "AA", "CA");

            // Step 30
            var message = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-30", this.DeviceSecretB));
            TestUtil.AssertOutcome(message, "AA", "CA");

            var response = message as ACK;
            Assert.AreEqual("TEST_HARNESS_B", response.MSH.ReceivingApplication.NamespaceID.Value);
            Assert.AreEqual("TEST", response.MSH.SendingApplication.NamespaceID.Value);
            Assert.IsNotNull(response.ERRs);

            // Step 40
            message = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-40", this.DeviceSecretB));
            TestUtil.AssertOutcome(message, "AA", "CA");

            response = message as ACK;
            Assert.AreEqual("TEST_HARNESS_B", response.MSH.ReceivingApplication.NamespaceID.Value);
            Assert.AreEqual("TEST", response.MSH.SendingApplication.NamespaceID.Value);
            Assert.IsNotNull(response.ERRs);

            // Step 50
            message = adtMessageHandler.HandleMessage(TestUtil.GetMessageEvent("OHIE-CR-17-50", this.DeviceSecretB));
            TestUtil.AssertOutcome(message, "AA", "CA");

            response = message as ACK;
            Assert.AreEqual("TEST_HARNESS_B", response.MSH.ReceivingApplication.NamespaceID.Value);
            Assert.AreEqual("TEST", response.MSH.SendingApplication.NamespaceID.Value);
            Assert.AreEqual(204, response.ERRs.FirstOrDefault().ApplicationErrorCode);
        }
    }
}
