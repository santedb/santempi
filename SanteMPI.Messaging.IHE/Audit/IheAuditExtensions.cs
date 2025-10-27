using Hl7.Fhir.Model;
using NHapi.Base.Model;
using NHapi.Base.Parser;
using RestSrvr;
using SanteDB.Core;
using SanteDB.Core.Security.Audit;
using SanteDB.Core.Attributes;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Hl7.Fhir.Model.CapabilityStatement;
using SanteDB.Core.Security;

[assembly: PluginTraceSource("SanteMPI")]

namespace SanteMPI.Messaging.IHE.Audit
{
    /// <summary>
    /// IHE Audit utility which constructs audits in a manner which matches the ITI
    /// </summary>
    public static class IheAuditExtensions
    {
        /// <summary>
        /// The ITI-8 audit code representing the Patient Identity Feed transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI8 = new AuditCode("ITI-8", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Patient Identity Feed" };

        /// <summary>
        /// The ITI-9 audit code representing the PIX Query transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI9 = new AuditCode("ITI-9", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "PIX Query" };

        /// <summary>
        /// The ITI-21 audit code representing the Patient Demographics Query transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI21 = new AuditCode("ITI-21", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Patient Demographics Query" };

        /// <summary>
        /// The ITI-78 audit code representing the Mobile Patient Demographics Query transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI78 = new AuditCode("ITI-78", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Demographics Query" };

        /// <summary>
        /// The ITI-83 audit code representing the Mobile Patient Identifier Cross Reference Query transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI83 = new AuditCode("ITI-83", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Identifier Cross Reference Query" };

        /// <summary>
        /// The ITI-93 audit code representing the Mobile Patient Identity Feed transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI93 = new AuditCode("ITI-93", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Identity Feed" };

        /// <summary>
        /// The ITI-94 audit code representing the Subscribe to Patient Updates transaction from the IHE IT Infrastructure Technical Framework.
        /// </summary>
        public static readonly AuditCode ITI94 = new AuditCode("ITI-94", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Subscribe to Patient Updates" };

        /// <summary>
        /// The HL7 configuration.
        /// </summary>
        private static readonly Hl7ConfigurationSection m_configuration = ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetSection<Hl7ConfigurationSection>();

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static IAuditBuilder ForSubscribeToPatientUpdate(this IAuditBuilder me, OutcomeIndicator outcome, TypeRestfulInteraction interaction, Subscription subscription)
        {
            me = me.WithEventIdentifier(EventIdentifierType.ApplicationActivity)
                .WithOutcome(outcome)
                .WithEventType(ITI94);

            switch (interaction)
            {
                case TypeRestfulInteraction.Create:
                    me = me.WithAction(ActionType.Create);
                    break;

                case TypeRestfulInteraction.Delete:
                    me = me.WithAction(ActionType.Delete);
                    break;

                case TypeRestfulInteraction.Update:
                    me = me.WithAction(ActionType.Update);
                    break;

                case TypeRestfulInteraction.Read:
                    me = me.WithAction(ActionType.Read);
                    break;
            }

            return me.WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal()
                .WithAuditableObjects(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Query,
                IDTypeCode = AuditableObjectIdType.Custom,
                CustomIdTypeCode = ITI94,
                ObjectId = subscription.Id,
                QueryData = subscription.Criteria
            });
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static IAuditBuilder ForPatientMasterIdentityRegistry(this IAuditBuilder me, OutcomeIndicator outcome, MessageHeader messageHeader, IEnumerable<Patient> patients)
        {
            me = me.WithEventIdentifier(EventIdentifierType.PatientRecord)
                .WithAction(ActionType.Execute)
                .WithOutcome(outcome)
                .WithEventType(ITI93)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal();

            if (outcome == OutcomeIndicator.Success)
            {
                me = me.WithAuditableObjects(patients.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToArray());
            }
            return me.WithAuditableObjects(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Resource,
                IDTypeCode = AuditableObjectIdType.NotSpecified,
                ObjectId = messageHeader.Id,
                NameData = messageHeader.Event.ToString()
            });
        }

        /// <summary>
        /// Send audit for patient identity cross reference
        /// </summary>
        public static IAuditBuilder ForPatientIdentityXref(this IAuditBuilder me, OutcomeIndicator outcome, IMessage request, IEnumerable< SanteDB.Core.Model.Roles.Patient > results)
        {
            me = me.WithEventIdentifier(EventIdentifierType.Query)
                .WithAction(ActionType.Execute)
                .WithOutcome(outcome)
                .WithEventType(ITI9)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal();

            if (outcome == OutcomeIndicator.Success)
            {
                me = me.WithAuditableObjects(results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = String.Join("~", $"{o.Key}^^^{m_configuration.LocalAuthority.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO")
                }).ToArray());
            }
            return me.WithAuditableObjects(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Query,
                IDTypeCode = AuditableObjectIdType.Custom,
                CustomIdTypeCode = ITI9,
                QueryData = new PipeParser().Encode(request),
                ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
            });

        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static IAuditBuilder ForPatientIdentityXrefMobile(this IAuditBuilder me, OutcomeIndicator outcome, IEnumerable<Patient> results)
        {
            me = me.WithEventIdentifier(EventIdentifierType.Query)
                .WithAction(ActionType.Execute)
                .WithOutcome(outcome)
                .WithEventType(ITI83)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal();


            if (outcome == OutcomeIndicator.Success)
            {
                me = me.WithAuditableObjects(results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToArray());
            }
            return me.WithAuditableObjects(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Query,
                IDTypeCode = AuditableObjectIdType.Custom,
                CustomIdTypeCode = ITI83,
                QueryData = RestOperationContext.Current?.IncomingRequest.Url.ToString(),
                ObjectData = RestOperationContext.Current?.IncomingRequest.Headers.AllKeys.Where(o => o.Equals("accept", StringComparison.OrdinalIgnoreCase)).Select(
                    h => new ObjectDataExtension(h, Encoding.UTF8.GetBytes(RestOperationContext.Current?.IncomingRequest.Headers[h]))
                    ).ToList()
            });

        }

        /// <summary>
        /// Send audit for patient identity feed
        /// </summary>
        public static IAuditBuilder ForPatientIdentityFeed(this IAuditBuilder me, OutcomeIndicator outcome, ActionType action, IMessage request, SanteDB.Core.Model.Roles.Patient patient)
        {
            me = me.WithEventIdentifier(EventIdentifierType.PatientRecord)
                .WithAction(action)
                .WithOutcome(outcome)
                .WithEventType(ITI8)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal();

            if (outcome == OutcomeIndicator.Success)
            {
                me = me.WithAuditableObjects(new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = action == ActionType.Create ? AuditableObjectLifecycle.Creation : AuditableObjectLifecycle.Amendment,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = $"{patient.Key}^^^{m_configuration.LocalAuthority?.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO",
                    ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                });
            }
            return me;
        }

        /// <summary>
        /// Send audit for patient identity feed
        /// </summary>
        public static IAuditBuilder ForPatientIdentityFeedMergeUpdate(this IAuditBuilder me, OutcomeIndicator outcome, IMessage request, Guid survivorId)
        {
            return me.WithEventIdentifier(EventIdentifierType.PatientRecord)
                .WithAction(ActionType.Update)
                .WithOutcome(outcome)
                .WithEventType(ITI8)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal()
                .WithAuditableObjects(new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Amendment,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = $"{survivorId}^^^{m_configuration.LocalAuthority?.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO",
                    ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                });

        }

        /// <summary>
        /// Create the merge portion of the update
        /// </summary>
        public static IAuditBuilder ForPatientIdentityFeedMergeDelete(this IAuditBuilder me, OutcomeIndicator outcome, IMessage request, Guid replacedId)
        {
            return me.WithEventIdentifier(EventIdentifierType.PatientRecord)
                .WithAction(ActionType.Delete)
                .WithOutcome(outcome)
                .WithEventType(ITI8)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal()
                .WithAuditableObjects(new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.LogicalDeletion,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = $"{replacedId}^^^{m_configuration.LocalAuthority?.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO",
                    ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                });
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static IAuditBuilder ForPatientDemographicsQuery(this IAuditBuilder me, OutcomeIndicator outcome, IMessage request, IEnumerable<SanteDB.Core.Model.Roles.Patient> results)
        {
            return me.WithEventIdentifier(EventIdentifierType.Query)
                .WithAction(ActionType.Execute)
                .WithOutcome(outcome)
                .WithEventType(ITI21)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal()
                .WithAuditableObjects(results?.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = String.Join("~", $"{o.Key}^^^{m_configuration.LocalAuthority.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO")
                }).ToArray())
                .WithAuditableObjects(new AuditableObject()
                {
                    Type = AuditableObjectType.SystemObject,
                    Role = AuditableObjectRole.Query,
                    IDTypeCode = AuditableObjectIdType.Custom,
                    CustomIdTypeCode = ITI9,
                    QueryData = new PipeParser().Encode(request),
                    ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                });
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static IAuditBuilder ForPatientDemographicsQueryMobile(this IAuditBuilder me, OutcomeIndicator outcome, IEnumerable<Patient> results)
        {
            return me.WithEventIdentifier(EventIdentifierType.Query)
                .WithAction(ActionType.Execute)
                .WithOutcome(outcome)
                .WithEventType(ITI78)
                .WithLocalDestination()
                .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                .WithPrincipal()
                .WithAuditableObjects(results?.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToArray())
                .WithAuditableObjects(new AuditableObject()
                {
                    Type = AuditableObjectType.SystemObject,
                    Role = AuditableObjectRole.Query,
                    IDTypeCode = AuditableObjectIdType.Custom,
                    CustomIdTypeCode = ITI78,
                    QueryData = RestOperationContext.Current?.IncomingRequest.Url.ToString(),
                    ObjectData = RestOperationContext.Current?.IncomingRequest.Headers.AllKeys.Where(o => o.Equals("accept", StringComparison.OrdinalIgnoreCase)).Select(
                    h => new ObjectDataExtension(h, Encoding.UTF8.GetBytes(RestOperationContext.Current?.IncomingRequest.Headers[h]))
                    ).ToList()
                });
        }
    }
}