using NHapi.Base.Model;
using NHapi.Model.V25.Segment;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Model.Collection;
using SanteDB.Core.Model.Roles;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Audit;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.Messages;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace SanteMPI.Messaging.IHE.HL7
{
    /// <summary>
    /// ADT message handler specifically designed for PIX
    /// </summary>
    [DisplayName("SanteMPI IHE PIX ADT Message Handler")]
    public class PixAdtMessageHandler : AdtMessageHandler
    {
        private readonly IAuditService m_auditService;

        /// <summary>
        /// Localization service
        /// </summary>
        public PixAdtMessageHandler(ILocalizationService localizationService, IRecordMergingService<Patient> mergeService, IRepositoryService<Bundle> bundleService, IAuditService auditService) : base(localizationService, mergeService, bundleService, auditService)
        {
            this.m_auditService = auditService;
        }

        /// <summary>
        /// Send an audit for admit
        /// </summary>
        protected override void SendAuditAdmit(OutcomeIndicator success, IMessage message, IEnumerable<IdentifiedData> enumerable)
        {
            this.m_auditService.Audit().ForPatientIdentityFeed(success, ActionType.Create, message, enumerable?.OfType<Patient>().First()).Send();
        }

        /// <summary>
        /// Send an update audit
        /// </summary>
        protected override void SendAuditUpdate(OutcomeIndicator outcome, IMessage message, IEnumerable<IdentifiedData> results)
        {
            this.m_auditService.Audit().ForPatientIdentityFeed(outcome, ActionType.Update, message, results?.OfType<Patient>().First()).Send();
        }

        /// <summary>
        /// Send an audit notification for merge
        /// </summary>
        protected override void SendAuditMerge(OutcomeIndicator outcome, IMessage message, RecordMergeResult recordMergeResult)
        {
            if (recordMergeResult == null)
            {
                this.m_auditService.Audit().ForPatientIdentityFeedMergeUpdate(outcome, message, recordMergeResult.Survivors.First()).Send();
                if (outcome == OutcomeIndicator.Success)
                {
                    recordMergeResult.Replaced.ToList().ForEach(o => this.m_auditService.Audit().ForPatientIdentityFeedMergeDelete(outcome, message, o).Send());
                }
            }
            else
            {
                this.m_auditService.Audit()
                    .WithEventIdentifier(EventIdentifierType.PatientRecord)
                    .WithAction(ActionType.Update)
                    .WithOutcome(outcome)
                    .WithEventType(IheAuditExtensions.ITI8)
                    .WithLocalDestination()
                    .WithRemoteSource(RemoteEndpointUtil.Current.GetRemoteClient())
                    .WithPrincipal();


            }
        }

        /// <summary>
        /// Creates the negative ack
        /// </summary>
        /// <remarks>This overridden method allows for capturing of errors</remarks>
        protected override IMessage CreateNACK(Type nackType, IMessage request, Exception error, Hl7MessageReceivedEventArgs receiveData)
        {
            var retVal = base.CreateNACK(nackType, request, error, receiveData);

            var ex = error;
            while (ex != null)
            {
                if (ex is KeyNotFoundException)
                {
                    (retVal.GetStructure("MSA") as MSA).AcknowledgmentCode.Value = "AR";
                    break;
                }
                ex = ex.InnerException;
            }
            return retVal;
        }
    }
}