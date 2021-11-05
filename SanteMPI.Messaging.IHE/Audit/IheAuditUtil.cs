using SanteDB.Core.Model;
using Hl7.Fhir.Model;
using NHapi.Base.Model;
using RestSrvr;
using SanteDB.Core.Attributes;
using SanteDB.Core.Auditing;
using SanteDB.Core.Security.Audit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Hl7.Fhir.Model.CapabilityStatement;
using NHapi.Base.Parser;
using SanteDB.Core.Services;
using SanteDB.Core;
using SanteDB.Messaging.HL7.Configuration;
using SanteDB.Core.Model.DataTypes;

[assembly: PluginTraceSource("SanteMPI")]

namespace SanteMPI.Messaging.IHE.Audit
{
    /// <summary>
    /// IHE Audit utility which constructs audits in a manner which matches the ITI
    /// </summary>
    public static class IheAuditUtil
    {
        public static readonly AuditCode ITI8 = new AuditCode("ITI-8", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Patient Identity Feed" };
        public static readonly AuditCode ITI9 = new AuditCode("ITI-9", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "PIX Query" };
        public static readonly AuditCode ITI21 = new AuditCode("ITI-21", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Patient Demographics Query" };
        public static readonly AuditCode ITI78 = new AuditCode("ITI-78", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Demographics Query" };
        public static readonly AuditCode ITI83 = new AuditCode("ITI-83", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Identifier Cross Reference Query" };
        public static readonly AuditCode ITI93 = new AuditCode("ITI-93", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Mobile Patient Identity Feed" };
        public static readonly AuditCode ITI94 = new AuditCode("ITI-94", "urn:oid:1.3.6.1.4.1.19376.1.2") { CodeSystemName = "IHE Transactions", DisplayName = "Subscribe to Patient Updates" };

        // Patient repository
        private static Hl7ConfigurationSection m_configuration = ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetSection<Hl7ConfigurationSection>();

        /// <summary>
        /// Create ITI audit event structure
        /// </summary>
        public static AuditData CreateITIAuditEvent(EventIdentifierType eventIdentifier, ActionType actionType, OutcomeIndicator outcome, AuditCode eventTypeCode)
        {
            return new AuditData(DateTime.Now, actionType, outcome, eventIdentifier, eventTypeCode);
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static void SendSubscribeToPatientUpdates(OutcomeIndicator outcome, TypeRestfulInteraction interaction, Subscription subscription)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.ApplicationActivity, ActionType.Execute, outcome, ITI94);

            switch (interaction)
            {
                case TypeRestfulInteraction.Create:
                    retVal.ActionCode = ActionType.Create;
                    break;

                case TypeRestfulInteraction.Delete:
                    retVal.ActionCode = ActionType.Delete;
                    break;

                case TypeRestfulInteraction.Update:
                    retVal.ActionCode = ActionType.Update;
                    break;

                case TypeRestfulInteraction.Read:
                    retVal.ActionCode = ActionType.Read;
                    break;
            }

            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            retVal.AuditableObjects.Add(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Query,
                IDTypeCode = AuditableObjectIdType.Custom,
                CustomIdTypeCode = ITI94,
                ObjectId = subscription.Id,
                QueryData = subscription.Criteria
            });

            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static void SendAuditPatientMasterIdentityRegistry(OutcomeIndicator outcome, MessageHeader messageHeader, params Patient[] patients)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.PatientRecord, ActionType.Execute, outcome, ITI93);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects = patients.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToList();
            }
            retVal.AuditableObjects.Add(new AuditableObject()
            {
                Type = AuditableObjectType.SystemObject,
                Role = AuditableObjectRole.Resource,
                IDTypeCode = AuditableObjectIdType.NotSpecified,
                ObjectId = messageHeader.Id,
                NameData = messageHeader.Event.ToString()
            });

            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send audit for patient identity cross reference
        /// </summary>
        public static void SendAuditPatientIdentityXref(OutcomeIndicator outcome, IMessage request, params SanteDB.Core.Model.Roles.Patient[] results)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.Query, ActionType.Execute, outcome, ITI9);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects = results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = String.Join("~", $"{o.Key}^^^{m_configuration.LocalAuthority.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO")
                }).ToList();
            }
            retVal.AuditableObjects.Add(new AuditableObject()
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

            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static void SendAuditPatientIdentityXrefMobile(OutcomeIndicator outcome, params Patient[] results)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.Query, ActionType.Execute, outcome, ITI83);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects = results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToList();
            }
            retVal.AuditableObjects.Add(new AuditableObject()
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

            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send audit for patient identity feed
        /// </summary>
        public static void SendAuditPatientIdentityFeed(OutcomeIndicator outcome, ActionType action, IMessage request, SanteDB.Core.Model.Roles.Patient patient)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.PatientRecord, action, outcome, ITI8);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects.Add(new AuditableObject()
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
            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send audit for patient identity feed
        /// </summary>
        public static void SendAuditPatientIdentityFeedMerge(OutcomeIndicator outcome, IMessage request, RecordMergeResult recordMergeResult)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.PatientRecord, ActionType.Update, outcome, ITI8);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);

            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects.Add(new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Amendment,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = $"{recordMergeResult.Survivors.First()}^^^{m_configuration.LocalAuthority?.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO",
                    ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                });
            }
            AuditUtil.SendAudit(retVal);

            foreach (var r in recordMergeResult.Replaced)
            {
                retVal = CreateITIAuditEvent(EventIdentifierType.PatientRecord, ActionType.Delete, outcome, ITI8);
                AuditUtil.AddLocalDeviceActor(retVal);
                AuditUtil.AddUserActor(retVal);
                if (outcome == OutcomeIndicator.Success)
                {
                    retVal.AuditableObjects.Add(new AuditableObject()
                    {
                        Type = AuditableObjectType.Person,
                        Role = AuditableObjectRole.Patient,
                        LifecycleType = AuditableObjectLifecycle.LogicalDeletion,
                        IDTypeCode = AuditableObjectIdType.PatientNumber,
                        ObjectId = $"{r}^^^{m_configuration.LocalAuthority?.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO",
                        ObjectData = new List<ObjectDataExtension>()
                {
                    new ObjectDataExtension("MSH-10", Encoding.UTF8.GetBytes((request.GetStructure("MSH") as ISegment).GetField(10).ToString()))
                }
                    });
                }
                AuditUtil.SendAudit(retVal);
            }
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static void SendAuditPatientDemographicsQuery(OutcomeIndicator outcome, IMessage request, params SanteDB.Core.Model.Roles.Patient[] results)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.Query, ActionType.Execute, outcome, ITI21);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);

            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects = results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = String.Join("~", $"{o.Key}^^^{m_configuration.LocalAuthority.DomainName}&{m_configuration.LocalAuthority.Oid}&ISO")
                }).ToList();
            }
            retVal.AuditableObjects.Add(new AuditableObject()
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

            AuditUtil.SendAudit(retVal);
        }

        /// <summary>
        /// Send an audit for PDQM
        /// </summary>
        public static void SendAuditPatientDemographicsQueryMobile(OutcomeIndicator outcome, params Patient[] results)
        {
            var retVal = CreateITIAuditEvent(EventIdentifierType.Query, ActionType.Execute, outcome, ITI78);
            AuditUtil.AddLocalDeviceActor(retVal);
            AuditUtil.AddUserActor(retVal);
            if (outcome == OutcomeIndicator.Success)
            {
                retVal.AuditableObjects = results.Select(o => new AuditableObject()
                {
                    Type = AuditableObjectType.Person,
                    Role = AuditableObjectRole.Patient,
                    LifecycleType = AuditableObjectLifecycle.Disclosure,
                    IDTypeCode = AuditableObjectIdType.PatientNumber,
                    ObjectId = o.Id
                }).ToList();
            }
            retVal.AuditableObjects.Add(new AuditableObject()
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

            AuditUtil.SendAudit(retVal);
        }
    }
}