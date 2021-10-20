using NHapi.Base.Model;
using NHapi.Model.V25.Message;
using SanteDB.Core.Auditing;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Roles;
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
    /// Represents a QBP message handler that restricts behavior to IHE PDQ
    /// </summary>
    [DisplayName("SanteMPI PDQ Message Handler")]
    public class PdqQbpMessageHandler : QbpMessageHandler
    {
        /// <summary>
        /// Create NACK per the IHE spec
        /// </summary>
        protected override IMessage CreateNACK(Type nackType, IMessage request, Exception error, Hl7MessageReceivedEventArgs receiveData)
        {
            var retVal = base.CreateNACK(nackType, request, error, receiveData) as RSP_K21;
            retVal.MSA.AcknowledgmentCode.Value = "AE";
            retVal.QAK.QueryResponseStatus.Value = "AE";
            return retVal;
        }

        /// <summary>
        /// Send audit query
        /// </summary>
        protected override void SendAuditQuery(OutcomeIndicator success, IMessage message, IEnumerable<IdentifiedData> results)
        {
            IheAuditUtil.SendAuditPatientDemographicsQuery(success, message, results.OfType<Patient>().ToArray());
        }
    }
}