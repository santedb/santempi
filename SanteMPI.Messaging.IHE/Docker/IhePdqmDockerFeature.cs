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
    public class IhePdqmDockerFeature : IDockerFeature
    {

        private Tracer m_tracer = Tracer.GetTracer(typeof(IhePdqmDockerFeature));

        /// <summary>
        /// Gets the id of the docker feature
        /// </summary>
        public string Id => "IHE_PDQM";

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
                this.m_tracer.TraceWarning("Cannot enable PDQm as the FHIR service is not configured!");
            }

            // Add modifier
            if (fhirConfig.BehaviorModifiers != null && fhirConfig.BehaviorModifiers.Count > 0) {
                fhirConfig.BehaviorModifiers.Add(new TypeReferenceConfiguration(typeof(PatientDemographicsQueryModifier)));
            }
            else
            {
                fhirConfig.BehaviorModifiers = new List<TypeReferenceConfiguration>()
                {
                    new TypeReferenceConfiguration(typeof(PatientIdentityCrossReferenceMobileOperation))
                };
            }

            // Add extension
            if(fhirConfig.Extensions != null && fhirConfig.Extensions.Count > 0)
            {
                fhirConfig.Extensions.Add("http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName");
            }
            else if(fhirConfig.ExtensionHandlers != null && fhirConfig.ExtensionHandlers.Count > 0)
            {
                fhirConfig.ExtensionHandlers.Add(new TypeReferenceConfiguration(typeof(MothersMaidenNameExtension)));
            }
            else 
            {
                fhirConfig.ExtensionHandlers = new List<TypeReferenceConfiguration>() { new TypeReferenceConfiguration(typeof(MothersMaidenNameExtension)) };
            }
        }
    }
}
