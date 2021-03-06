﻿using NHapi.Base.Model;
using NHapi.Model.V25.Message;
using NHapi.Model.V25.Segment;
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
                    (retVal.GetStructure("MSA") as MSA).AcknowledgmentCode.Value = "AE";
                    (retVal.GetStructure("QAK") as QAK).QueryResponseStatus.Value = "AE";
                    break;
                }
                ex = ex.InnerException;
            }
            return retVal;
        }

        /// <summary>
        /// Create query response for the data according to ITI-9
        /// </summary>
        protected override IMessage CreateQueryResponse(Hl7MessageReceivedEventArgs request, Expression filter, Hl7QueryParameterType map, IEnumerable results, Guid queryId, int offset, int count, int totalResults)
        {
            var retVal = base.CreateQueryResponse(request, filter, map, results, queryId, offset, count, totalResults) as RSP_K23;

            // CASE 3: Domains are recognized but no results
            if (results.OfType<Patient>().Count() == 0)
            {
                retVal.MSA.AcknowledgmentCode.Value = "AE";
                retVal.MSA.TextMessage.Value = "Query Error";
                retVal.QAK.QueryResponseStatus.Value = "AE";
                retVal.ERR.GetErrorLocation(0).SegmentID.Value = "QPD";
                retVal.ERR.GetErrorLocation(0).SegmentSequence.Value = "1";
                retVal.ERR.GetErrorLocation(0).FieldPosition.Value = "3";
                retVal.ERR.GetErrorLocation(0).FieldRepetition.Value = "1";
                retVal.ERR.GetErrorLocation(0).ComponentNumber.Value = "1";
                retVal.ERR.HL7ErrorCode.Identifier.Value = "204";
                retVal.ERR.HL7ErrorCode.Text.Value = "Unknown Key Identifier";
     
            }

            return retVal;
        }
    }
}
