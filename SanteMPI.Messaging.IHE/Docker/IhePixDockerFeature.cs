using SanteDB.Core.Configuration;
using SanteDB.Core.Diagnostics;
using SanteDB.Docker.Core;
using SanteDB.Messaging.FHIR.Configuration;
using SanteDB.Messaging.HL7.Configuration;
using SanteMPI.Messaging.IHE.FHIR;
using SanteMPI.Messaging.IHE.HL7;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;

namespace SanteMPI.Messaging.IHE.Docker
{
    /// <summary>
    /// Docker feature for PMIR
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class IhePixDockerFeature : IDockerFeature
    {
        private Tracer m_tracer = Tracer.GetTracer(typeof(IhePixDockerFeature));

        /// <summary>
        /// Gets the id of the docker feature
        /// </summary>
        public string Id => "IHE_PIX";

        /// <summary>
        /// Gets the settings
        /// </summary>
        public IEnumerable<string> Settings => new String[] { };

        /// <summary>
        /// Configure the feature
        /// </summary>
        public void Configure(SanteDBConfiguration configuration, IDictionary<string, string> settings)
        {
            // Get the fhir setting and add the PMIR features
            var hl7Config = configuration.GetSection<Hl7ConfigurationSection>();
            if (hl7Config == null)
            {
                this.m_tracer.TraceWarning("Cannot enable PIX as the HL7 service is not configured!");
            }

            // Add handler
            hl7Config.Services.ForEach(s =>
            {
                // Remove the vanilla QBP handler
                s.MessageHandlers.ForEach(m => m.Types.RemoveAll(t => t.Name == "QBP^Q23"));
                s.MessageHandlers.ForEach(m => m.Types.RemoveAll(t => t.Name == "ADT^A01" || t.Name == "ADT^A04" || t.Name == "ADT^A08" || t.Name == "ADT^A40"));
                s.MessageHandlers.RemoveAll(m => !m.Types.Any());
                // Register the IHE PIX handler
                s.MessageHandlers.Add(new HandlerDefinition()
                {
                    HandlerType = new TypeReferenceConfiguration(typeof(PixQbpMessageHandler)),
                    Types = new List<MessageDefinition>()
                    {
                        new MessageDefinition()
                        {
                            IsQuery = true,
                            Name = "QBP^Q23"
                        }
                    }
                });

                s.MessageHandlers.Add(new HandlerDefinition()
                {
                    HandlerType = new TypeReferenceConfiguration(typeof(PixAdtMessageHandler)),
                    Types = new List<MessageDefinition>()
                    {
                        new MessageDefinition()
                        {
                            IsQuery = false,
                            Name = "ADT^A01"
                        },
                         new MessageDefinition()
                        {
                            IsQuery = false,
                            Name = "ADT^A04"
                        },
                          new MessageDefinition()
                        {
                            IsQuery = false,
                            Name = "ADT^A08"
                        },
                           new MessageDefinition()
                        {
                            IsQuery = false,
                            Name = "ADT^A40"
                        }
                    }
                });
            });
        }
    }
}