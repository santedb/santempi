using NHapi.Base.Model;
using SanteDB.Core.Model.Collection;
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
        protected override IMessage HandleMessageInternal(Hl7MessageReceivedEventArgs e, Bundle parsed)
        {
            return base.HandleMessageInternal(e, parsed);
        }
    }
}
