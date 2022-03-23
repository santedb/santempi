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
            TestUtil.CreateAuthority("TEST", "2.16.840.1.113883.3.72.5.9.1", "", "TEST_HARNESS", DeviceSecretA);
            TestUtil.CreateAuthority("NID", "2.16.840.1.113883.3.72.5.9.9", "", "NID_AUTH", DeviceSecretA);
        }
    }
}
