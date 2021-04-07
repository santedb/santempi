using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHapi.Base.Model;
using NHapi.Base.Parser;
using NHapi.Model.V25.Segment;
using SanteDB.Core;
using SanteDB.Core.Model.Security;
using SanteDB.Core.Security;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteDB.Messaging.HL7.Utils;
using System;
using System.IO;
using System.Linq;

namespace SanteMPI.Messaging.IHE.Test
{
    /// <summary>
    /// Test utility classes
    /// </summary>
    public static class TestUtil
    {

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static IMessage GetMessage(String messageName)
        {
            string originalVersion = null;
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Messaging.IHE.Test.Resources.{messageName}.txt")) 
            using (var sw = new StreamReader(s))
                return MessageUtils.ParseMessage(sw.ReadToEnd(), out originalVersion);
        }

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static Hl7MessageReceivedEventArgs GetMessageEvent(String messageName)
        {
            return new Hl7MessageReceivedEventArgs(
                message: GetMessage(messageName),
                solicitorEp: new Uri("test://sut"),
                receiveEp: new Uri("test://test"),
                timestamp: DateTime.Now
            );
        }

        /// <summary>
        /// Assert the outcome of a message
        /// </summary>
        public static void AssertOutcome(IMessage message, params String[] acknowledgement)
        {
            Assert.IsTrue(acknowledgement.Any(a => a == (message.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(message));
        }

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static Hl7MessageReceivedEventArgs GetMessageEvent(String messageName, byte[] deviceSecret)
        {
            return new AuthenticatedHl7MessageReceivedEventArgs(
                message: GetMessage(messageName),
                solicitorEp: new Uri("test://sut"),
                receiveEp: new Uri("test://test"),
                timestamp: DateTime.Now,
                authorization: deviceSecret
            );
        }
        /// <summary>
        /// Represent message as string
        /// </summary>
        public static String ToString(IMessage msg)
        {
            
            return MessageUtils.EncodeMessage(msg, "2.5.1");
        }

        /// <summary>
        /// Create the specified authority
        /// </summary>
        public static void CreateAuthority(string nsid, string oid, string applicationName, byte[] deviceSecret)
        {
            // Create the test harness device / application
            var securityDevService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityDevice>>();
            var securityAppService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityApplication>>();
            var metadataService = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();

            AuthenticationContext.Current = new AuthenticationContext(AuthenticationContext.SystemPrincipal);
            string pubId = $"{applicationName}|TEST";
            var device = securityDevService.Find(o => o.Name == pubId).FirstOrDefault();
            if (device == null)
            {
                device = new SecurityDevice()
                {
                    DeviceSecret = BitConverter.ToString(deviceSecret).Replace("-", ""),
                    Name = $"{applicationName}|TEST"
                };
                device.AddPolicy(PermissionPolicyIdentifiers.LoginAsService);
                device = securityDevService.Insert(device);
            }

            // Application
            var app = securityAppService.Find(o => o.Name == applicationName).FirstOrDefault();
            if(app == null)
            {
                app = new SecurityApplication()
                {
                    Name = applicationName,
                    ApplicationSecret = BitConverter.ToString(deviceSecret).Replace("-", "")
                };
                app.AddPolicy(PermissionPolicyIdentifiers.LoginAsService);
                app.AddPolicy(PermissionPolicyIdentifiers.UnrestrictedClinicalData);
                app.AddPolicy(PermissionPolicyIdentifiers.ReadMetadata);
                app = securityAppService.Insert(app);
            }

            // Create AA
            var aa = metadataService.Get(nsid);
            if(aa == null)
            {
                aa = new SanteDB.Core.Model.DataTypes.AssigningAuthority(nsid, nsid, oid)
                {
                    AssigningApplicationKey = app.Key,
                    IsUnique = true
                };
                metadataService.Insert(aa);
            }

        }
    }
}
