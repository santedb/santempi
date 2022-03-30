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
    public class TestOhieCr16 : DataTest
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
        /// This test will ensure that the client registry can appropriately handle a merge condition whereby a local assigning authority notifies the client 
        /// registry of a local merge(two local identifiers are in fact the same person).
        /// </summary>
        [Test]
        public void TestOhieCr16_()
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

            TestUtil.AssertOutcome(actual,  "AA");

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