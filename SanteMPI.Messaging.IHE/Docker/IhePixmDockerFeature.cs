using SanteDB.Core.Configuration;
using SanteDB.Core.Diagnostics;
using SanteDB.Docker.Core;
using SanteDB.Messaging.FHIR.Configuration;
using SanteMPI.Messaging.IHE.FHIR;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace SanteMPI.Messaging.IHE.Docker
{
    /// <summary>
    /// Docker feature for PMIR
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class IhePixmDockerFeature : IDockerFeature
    {

        private Tracer m_tracer = Tracer.GetTracer(typeof(IhePixmDockerFeature));

        /// <summary>
        /// Gets the id of the docker feature
        /// </summary>
        public string Id => "IHE_PIXM";

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
                this.m_tracer.TraceWarning("Cannot enable PIXm as the FHIR service is not configured!");
            }

            if (fhirConfig.Operations != null && fhirConfig.Operations.Count > 0)
            {
                fhirConfig.Operations.Add("ihe-pix");
            }
            else if (fhirConfig.OperationHandlers != null && fhirConfig.OperationHandlers.Count > 0)
            {
                fhirConfig.OperationHandlers.Add(new TypeReferenceConfiguration(typeof(PatientIdentityCrossReferenceMobileOperation)));
            }
            else
            {
                fhirConfig.OperationHandlers = new List<TypeReferenceConfiguration>() { new TypeReferenceConfiguration(typeof(PatientIdentityCrossReferenceMobileOperation)) };
            }
        }
    }
}
