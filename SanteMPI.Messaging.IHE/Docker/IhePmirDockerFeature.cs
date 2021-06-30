using SanteDB.Core.Configuration;
using SanteDB.Core.Diagnostics;
using SanteDB.Docker.Core;
using SanteDB.Messaging.FHIR.Configuration;
using SanteMPI.Messaging.IHE.FHIR;
using System;
using System.Collections.Generic;
using System.Text;

namespace SanteMPI.Messaging.IHE.Docker
{
    /// <summary>
    /// Docker feature for PMIR
    /// </summary>
    public class IhePmirDockerFeature : IDockerFeature
    {

        private Tracer m_tracer = Tracer.GetTracer(typeof(IhePmirDockerFeature));

        /// <summary>
        /// Gets the id of the docker feature
        /// </summary>
        public string Id => "IHE_PMIR";

        /// <summary>
        /// Gets the settings
        /// </summary>
        public IEnumerable<string> Settings => new String[] {};

        /// <summary>
        /// Configure the feature
        /// </summary>
        public void Configure(SanteDBConfiguration configuration, IDictionary<string, string> settings)
        {

            // Get the fhir setting and add the PMIR features
            var fhirConfig = configuration.GetSection<FhirServiceConfigurationSection>();
            if(fhirConfig == null)
            {
                this.m_tracer.TraceWarning("Cannot enable PIMR as the FHIR service is not configured!");
            }

            if (fhirConfig.Messages != null && fhirConfig.Messages.Count > 0) {
                fhirConfig.Messages.Add("urn:ihe:iti:pmir:2019:patient-feed");
            }
            else if(fhirConfig.MessageHandlers != null )
            {
                fhirConfig.MessageHandlers.Add(new TypeReferenceConfiguration(typeof(PatientIdentityCrossReferenceMobileOperation)));
            }
            else
            {
                fhirConfig.MessageHandlers = new List<TypeReferenceConfiguration>()
                {
                    new TypeReferenceConfiguration(typeof(PatientIdentityCrossReferenceMobileOperation))
                };
            }
        }
    }
}
