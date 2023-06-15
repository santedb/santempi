using Hl7.Fhir.Model;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json;
using NHapi.Base.Model;
using NHapi.Base.Parser;
using NHapi.Model.V25.Segment;
using NUnit.Framework;
using SanteDB;
using SanteDB.Core;
using SanteDB.Core.Model;
using SanteDB.Core.Model.DataTypes;
using SanteDB.Core.Model.Security;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteDB.Messaging.HL7.Utils;
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Patient = SanteDB.Core.Model.Roles.Patient;

namespace SanteMPI.Messaging.IHE.Test
{
    /// <summary>
    /// Test utility classes
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class TestUtil
    {
        /// <summary>
        /// Assert FHIR outcome
        /// </summary>
        internal static void AssertFhirOutcome<TFocalResource>(Resource response, MessageHeader.ResponseType expectedResponse, out TFocalResource responseFocus)
            where TFocalResource : class
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
        /// Assert the outcome of a message
        /// </summary>
        public static void AssertOutcome(IMessage message, params string[] acknowledgement)
        {
            Assert.IsTrue(acknowledgement.Any(a => a == (message.GetStructure("MSA") as MSA).AcknowledgmentCode.Value), new PipeParser().Encode(message));
        }

        /// <summary>
        /// Assert that a patient exits
        /// </summary>
        internal static void AssertPatientExists(string authority, string identifier)
        {
            using (AuthenticationContext.EnterSystemContext())
            {
                var results = ApplicationServiceContext.Current.GetService<IRepositoryService<Patient>>().Find(o => o.Identifiers.Any(i => i.Authority.DomainName == authority && i.Value == identifier));
                Assert.AreEqual(1, results.Count());
            }
        }

        /// <summary>
        /// Mimic an authentication
        /// </summary>
        internal static IDisposable AuthenticateFhir(string appId, String appSecret)
        {
            var appIdService = ApplicationServiceContext.Current.GetService<IApplicationIdentityProviderService>();
            var appPrincipal = appIdService.Authenticate(appId, appSecret);
            var sesPvdService = ApplicationServiceContext.Current.GetService<ISessionProviderService>();
            var sesIdService = ApplicationServiceContext.Current.GetService<ISessionIdentityProviderService>();
            var session = sesPvdService.Establish(appPrincipal, "http://localhost", false, null, null, null);
            return AuthenticationContext.EnterContext(sesIdService.Authenticate(session));
        }

        /// <summary>
        /// Create the specified authority
        /// </summary>
        public static void CreateAuthority(string nsid, string oid, string url, string applicationName, String applicationSecret, X509Certificate2 authenticationCertificate = null)
        {
            // Create the test harness device / application
            var securityDevService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityDevice>>();
            var securityAppService = ApplicationServiceContext.Current.GetService<IRepositoryService<SecurityApplication>>();
            var metadataService = ApplicationServiceContext.Current.GetService<IAssigningAuthorityRepositoryService>();
            var policyInfoService = ApplicationServiceContext.Current.GetService<IPolicyInformationService>();
            var certIdService = ApplicationServiceContext.Current.GetService<ICertificateIdentityProvider>();
            var devIdService = ApplicationServiceContext.Current.GetService<IDeviceIdentityProviderService>();
            var appIdService = ApplicationServiceContext.Current.GetService<IApplicationIdentityProviderService>();

            using (AuthenticationContext.EnterSystemContext())
            {
                if (!string.IsNullOrEmpty(applicationName))
                {
                    var pubId = $"{applicationName}|TEST";
                    var device = devIdService.GetIdentity(pubId);
                    if (device == null && authenticationCertificate != null)
                    {
                        var nd = new SecurityDevice
                        {
                            DeviceSecret = Guid.NewGuid().ToString(),
                            Name = $"{applicationName}|TEST"
                        };
                        nd.AddPolicy(PermissionPolicyIdentifiers.LoginAsService);
                        securityDevService.Insert(nd);
                        device = devIdService.GetIdentity(pubId);
                        policyInfoService.AddPolicies(device, PolicyGrantType.Grant, AuthenticationContext.Current.Principal, PermissionPolicyIdentifiers.LoginAsService);
                        certIdService.AddIdentityMap(device, authenticationCertificate, AuthenticationContext.Current.Principal);
                    }

                    // Application
                    var app = securityAppService.Find(o => o.Name == applicationName).FirstOrDefault();
                    if (app == null)
                    {
                        app = new SecurityApplication
                        {
                            Name = applicationName,
                            ApplicationSecret = applicationSecret
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
                    aa = new AssigningAuthority(nsid, nsid, oid)
                    {
                        IsUnique = true,
                        Url = url
                    };
                    if (!String.IsNullOrEmpty(applicationName))
                    {
                        aa.AssigningApplicationKey = securityAppService.Find(o => o.Name == applicationName).FirstOrDefault().Key;
                    }
                    metadataService.Insert(aa);
                }
                else
                {
                    var sid = securityAppService.Find(o => o.Name == applicationName)?.FirstOrDefault().Key;
                    aa.AssigningApplicationKey = sid;
                    aa.Url = url;
                    metadataService.Save(aa);
                }
            }
        }

        /// <summary>
        /// Get a FHIR message
        /// </summary>
        public static Resource GetFhirMessage(string messageName)
        {
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Test.Resources.FHIR.{messageName}.json"))
            using (var sr = new StreamReader(s))
            using (var jr = new JsonTextReader(sr))
            {
                return new FhirJsonParser().Parse(jr) as Resource;
            }
        }

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static IMessage GetMessage(string messageName)
        {
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Test.Resources.HL7.{messageName}.txt"))
            using (var sw = new StreamReader(s))
            {
                var message = MessageUtils.ParseMessage(sw.ReadToEnd(), out var originalVersion);
                (message.GetAll("MSH")[0] as MSH).Security.Value = "I_AM_A_TEAPOT";
                return message;
            }
        }


        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static Hl7MessageReceivedEventArgs GetMessageEvent(string messageName, X509Certificate2 authenticationCertificate)
        {
            return new AuthenticatedHl7MessageReceivedEventArgs(GetMessage(messageName), new Uri("test://sut"), new Uri("test://test"), DateTime.Now, authenticationCertificate);
        }

        /// <summary>
        /// Represent message as string
        /// </summary>
        public static string ToString(IMessage msg)
        {
            return MessageUtils.EncodeMessage(msg, "2.5.1");
        }
    }
}