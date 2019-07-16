using NHapi.Base.Model;
using NHapi.Model.V25.Segment;
using SanteDB.Core.Model.Collection;
using SanteDB.Messaging.HL7.Exceptions;
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
    /// ADT message handler specifically designed for PIX
    /// </summary>
    public class PixAdtMessageHandler : AdtMessageHandler
    {

        /// <summary>
        /// Creates the negative ack 
        /// </summary>
        /// <remarks>This overridden method allows for capturing of errors</remarks>
        protected override IMessage CreateNACK(Type nackType, IMessage request, Exception error, Hl7MessageReceivedEventArgs receiveData)
        {
            var retVal = base.CreateNACK(nackType, request, error, receiveData);
            if (error is AssigningAuthorityNotFoundException)
                (retVal.GetStructure("MSA") as MSA).AcknowledgmentCode.Value = "AR";
            return retVal;
        }
    }
}
