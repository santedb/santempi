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
    public class TestOhieCr15 : DataTest
    {
        // Device secret
        private readonly byte[] DeviceSecretA = new byte[] {0x1, 0x2, 0x3, 0x4, 0x5, 0x6};

        // Service manager
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
        public void TestOhieCr15_()
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

            // Check that one PID reciever sent only one PID segment with identifier RJ-439 in PID-3
            var matchingIdentifierCount = pidSegments.Count(x => x.IDNumber.Value == "RJ-439");
            Assert.AreEqual(1, matchingIdentifierCount);

            // Check that one PID reciever sent only one PID segment with domain TEST in PID-3
            var matchingDomainCount = pidSegments.Count(x => x.AssigningAuthority.NamespaceID.Value == "TEST");
            Assert.AreEqual(1, matchingDomainCount );

            // **Step 30 - needed to remove repeating segment
            message = TestUtil.GetMessageEvent("OHIE-CR-15-30", DeviceSecretA);
            result = this.m_serviceManager.CreateInjected<PdqQbpMessageHandler>().HandleMessage(message);
            response = (RSP_K21)result;

            Assert.AreEqual("AA", response.MSA.AcknowledgmentCode.Value);
            Assert.AreEqual("OK", response.QAK.QueryResponseStatus.Value);

            
            Assert.AreEqual(1, response.QUERY_RESPONSERepetitionsUsed);

            pidSegments = response.GetQUERY_RESPONSE().PID.GetPatientIdentifierList();

            // Check that one PID reciever sent only one PID segment with identifier RJ-439 in PID-3
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

            // Check that one PID reciever sent only one PID segment with identifier RJ-439 in PID-3
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
    }
}
