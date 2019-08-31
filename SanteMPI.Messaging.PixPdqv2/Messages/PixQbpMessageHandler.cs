using NHapi.Base.Model;
using NHapi.Model.V25.Message;
using SanteDB.Core;
using SanteDB.Core.Model.Roles;
using SanteDB.Core.Services;
using SanteDB.Messaging.HL7.Messages;
using SanteDB.Messaging.HL7.ParameterMap;
using SanteDB.Messaging.HL7.TransportProtocol;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Messaging.PixPdqv2.Messages
{
    /// <summary>
    /// Represents a QBP message handler that restricts behavior to IHE PIX Query (ITI-9)
    /// </summary>
    public class PixQbpMessageHandler : QbpMessageHandler
    {

    }
}
