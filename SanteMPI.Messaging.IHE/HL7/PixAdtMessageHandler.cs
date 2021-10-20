using NHapi.Base.Model;
using NHapi.Model.V25.Segment;
using SanteDB.Core.Auditing;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Collection;
using SanteDB.Core.Model.Roles;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.Exceptions;
using SanteDB.Messaging.HL7.Messages;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Messaging.IHE.HL7
{
    /// <summary>
    /// ADT message handler specifically designed for PIX
    /// </summary>
    [DisplayName("SanteMPI IHE PIX ADT Message Handler")]
    public class PixAdtMessageHandler : AdtMessageHandler
    {
        /// <summary>
        /// Send an audit for admit
        /// </summary>
        protected override void SendAuditAdmit(OutcomeIndicator success, IMessage message, IEnumerable<IdentifiedData> enumerable)
        {
            IheAuditUtil.SendAuditPatientIdentityFeed(success, ActionType.Create, message, enumerable.OfType<Patient>().First());
        }

        /// <summary>
        /// Send an update audit
        /// </summary>
        protected override void SendAuditUpdate(OutcomeIndicator outcome, IMessage message, IEnumerable<IdentifiedData> results)
        {
            IheAuditUtil.SendAuditPatientIdentityFeed(outcome, ActionType.Update, message, results.OfType<Patient>().First());
        }

        /// <summary>
        /// Send an audit notification for merge
        /// </summary>
        protected override void SendAuditMerge(OutcomeIndicator outcome, IMessage message, RecordMergeResult recordMergeResult)
        {
            IheAuditUtil.SendAuditPatientIdentityFeedMerge(outcome, message, recordMergeResult);
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