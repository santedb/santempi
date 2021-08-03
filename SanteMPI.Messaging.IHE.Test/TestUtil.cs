using Hl7.Fhir.Model;
using Newtonsoft.Json;
using NHapi.Base.Model;
using NHapi.Base.Parser;
using NHapi.Model.V25.Segment;
using NUnit.Framework;
using SanteDB.Core;
using SanteDB.Core.Model.Security;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
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
        /// Get a FHIR message
        /// </summary>
        public static Resource GetFhirMessage(String messageName)
        {
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Messaging.IHE.Test.Resources.FHIR.{messageName}.json"))
            using (var sr = new StreamReader(s))
            using (var jr = new JsonTextReader(sr))
                return new Hl7.Fhir.Serialization.FhirJsonParser().Parse(jr) as Resource;
        }

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static IMessage GetMessage(String messageName)
        {
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Messaging.IHE.Test.Resources.HL7.{messageName}.txt"))
            using (var sw = new StreamReader(s))
                return MessageUtils.ParseMessage(sw.ReadToEnd(), out string originalVersion);
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
        public static void CreateAuthority(string nsid, string oid, String url, string applicationName, byte[] deviceSecret)
        {
            // Create the test harness device / application
            var securityDevService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityDevice>>();
            var securityAppService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityApplication>>();
            var metadataService = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();
            SecurityApplication app = null;

            using (AuthenticationContext.EnterSystemContext())
            {
                if (!String.IsNullOrEmpty(applicationName))
                {
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
                    app = securityAppService.Find(o => o.Name == applicationName).FirstOrDefault();
                    if (app == null)
                    {
                        app = new SecurityApplication()
                        {
                            Name = applicationName,
                            ApplicationSecret = BitConverter.ToString(deviceSecret).Replace("-", "")
                        };
                        app.AddPolicy(PermissionPolicyIdentifiers.LoginAsService);
                        app.AddPolicy(PermissionPolicyIdentifiers.UnrestrictedClinicalData);
                        app.AddPolicy(PermissionPolicyIdentifiers.UnrestrictedMetadata);
                        app = securityAppService.Insert(app);
                    }
                }

                // Create AA
                var aa = metadataService.Get(nsid);
                if (aa == null)
                {
                    aa = new SanteDB.Core.Model.DataTypes.AssigningAuthority(nsid, nsid, oid)
                    {
                        AssigningApplicationKey = app?.Key,
                        IsUnique = true,
                        Url = url
                    };
                    metadataService.Insert(aa);
                }
                else
                {
                    aa.AssigningApplicationKey = app?.Key;
                    aa.Url = url;
                    metadataService.Save(aa);
                }
            }
        }

        /// <summary>
        /// Assert FHIR outcome
        /// </summary>
        internal static void AssertFhirOutcome<TFocalResource>(Resource response, MessageHeader.ResponseType expectedResponse, out TFocalResource responseFocus)
            where TFocalResource: class
        {
            Assert.IsInstanceOf<Bundle>(response);
            var bundleResponse = response as Bundle;
            Assert.AreEqual(1, bundleResponse.Entry.Count(o => o.Resource is MessageHeader));
            var mh = bundleResponse.Entry.FirstOrDefault(o => o.Resource is MessageHeader)?.Resource as MessageHeader;
            Assert.AreEqual(expectedResponse, mh.Response.Code);
            Assert.IsNotNull(mh.Response.Details);
            Assert.AreEqual(1, bundleResponse.Entry.Count(o => o.Resource is TFocalResource));
            //Assert.AreEqual(1, bundleResponse.Entry.Count(o => o.FullUrl == mh.Response.Details.Reference)); // Must resolve oo
            responseFocus = bundleResponse.Entry.FirstOrDefault(o => o.FullUrl == mh.Response.Details.Reference)?.Resource as TFocalResource;
        }

        /// <summary>
        /// Mimic an authentication
        /// </summary>
        internal static IDisposable AuthenticateFhir(string appId, byte[] appSecret)
        {
            var appIdService = ApplicationServiceContext.Current.GetService<IApplicationIdentityProviderService>();
            var appPrincipal = appIdService.Authenticate(appId, BitConverter.ToString(appSecret).Replace("-", ""));
            var sesPvdService = ApplicationServiceContext.Current.GetService<ISessionProviderService>();
            var sesIdService = ApplicationServiceContext.Current.GetService<ISessionIdentityProviderService>();
            var session = sesPvdService.Establish(appPrincipal, "http://localhost", false, null, null, null);
            return AuthenticationContext.EnterContext(sesIdService.Authenticate(session));
        }

        /// <summary>
        /// Assert that a patient exits
        /// </summary>
        internal static void AssertPatientExists(string authority, string identifier)
        {
            using(AuthenticationContext.EnterSystemContext())
            {
                var results = ApplicationServiceContext.Current.GetService<IRepositoryService<SanteDB.Core.Model.Roles.Patient>>().Find(o => o.Identifiers.Any(i => i.Authority.DomainName == authority && i.Value == identifier));
                Assert.AreEqual(1, results.Count());
            }
        }
    }
}
