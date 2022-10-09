using NHapi.Base.Model;
using NHapi.Model.V25.Message;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Roles;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.Messages;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using SanteDB.Core.Security;

namespace SanteMPI.Messaging.IHE.HL7
{
    /// <summary>
    /// Represents a QBP message handler that restricts behavior to IHE PDQ
    /// </summary>
    [DisplayName("SanteMPI PDQ Message Handler")]
    public class PdqQbpMessageHandler : QbpMessageHandler
    {
        private readonly IAuditService m_auditService;

        /// <summary>
        /// PDQ message handler
        /// </summary>
        public PdqQbpMessageHandler(ILocalizationService localizationService, IAuditService auditService) : base(localizationService, auditService)
        {
            this.m_auditService = auditService;
        }

        /// <summary>
        /// Create NACK per the IHE spec
        /// </summary>
        protected override IMessage CreateNACK(Type nackType, IMessage request, Exception error, Hl7MessageReceivedEventArgs receiveData)
        {
            var retVal = base.CreateNACK(typeof(RSP_K21), request, error, receiveData);
            
            if (retVal is RSP_K21 rsp)
            {
                rsp.MSA.AcknowledgmentCode.Value = "AE";
                rsp.QAK.QueryResponseStatus.Value = "AE";
            }
            else if (retVal is ACK ack)
            {
                ack.MSA.AcknowledgmentCode.Value = "AE";
            }
            return retVal;
        }

        /// <summary>
        /// Send audit query
        /// </summary>
        protected override void SendAuditQuery(OutcomeIndicator success, IMessage message, IEnumerable<IdentifiedData> results)
        {
            this.m_auditService.Audit().ForPatientDemographicsQuery(success, message, results?.OfType<Patient>()).Send();
        }
    }
}