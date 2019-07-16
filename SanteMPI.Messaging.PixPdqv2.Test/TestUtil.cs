using NHapi.Base.Model;
using NHapi.Base.Parser;
using SanteDB.Messaging.HL7.TransportProtocol;
using SanteDB.Messaging.HL7.Utils;
using System;
using System.IO;

namespace SanteMPI.Messaging.PixPdqv2.Test
{
    /// <summary>
    /// Test utility classes
    /// </summary>
    public static class TestUtil
    {

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static IMessage GetMessage(String messageName)
        {
            string originalVersion = null;
            using (var s = typeof(TestUtil).Assembly.GetManifestResourceStream($"SanteMPI.Messaging.PixPdqv2.Test.Resources.{messageName}.txt")) 
            using (var sw = new StreamReader(s))
                return MessageUtils.ParseMessage(sw.ReadToEnd(), out originalVersion);
        }

        /// <summary>
        /// Get the message from the test assembly
        /// </summary>
        public static Hl7MessageReceivedEventArgs GetMessageEvent(String messageName)
        {
            return new Hl7MessageReceivedEventArgs(
                message: GetMessage(messageName),
                solicitorEp: new Uri("test://sut"),
                receiveEp: new Uri("test://test"),
                timestamp: DateTime.Now
            );
        }

        /// <summary>
        /// Represent message as string
        /// </summary>
        public static String ToString(IMessage msg)
        {
            
            return MessageUtils.EncodeMessage(msg, "2.5.1");
        }
    }
}
