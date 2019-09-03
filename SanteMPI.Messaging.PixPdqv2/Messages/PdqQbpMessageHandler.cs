using NHapi.Base.Model;
using NHapi.Model.V25.Message;
using SanteDB.Messaging.HL7.Messages;
using SanteDB.Messaging.HL7.TransportProtocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Messaging.PixPdqv2.Messages
{
    /// <summary>
    /// Represents a QBP message handler that restricts behavior to IHE PDQ
    /// </summary>
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

    }
}
