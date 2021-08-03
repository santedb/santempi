using Hl7.Fhir.Model;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Constants;
using SanteDB.Core.Model.Interfaces;
using SanteDB.Core.Services;
using SanteDB.Messaging.FHIR.Extensions;
using SanteDB.Messaging.FHIR.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// Mother's maiden name extension
    /// </summary>
    public class MothersMaidenNameExtension : IFhirExtensionHandler
    {
        private const string URI = "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName";

        /// <summary>
        /// Creates a new mother's maiden name
        /// </summary>
        public MothersMaidenNameExtension(IExtensionTypeRepository extensionRepo)
        {
            // Register the extension type and the underlying FHIR will do the rest
            QueryRewriter.AddSearchParam<Patient>("mothersMaidenName", $"relationship[29ff64e5-b564-411a-92c7-6818c02a9e48].target@Person.name[0674C1C8-963A-4658-AFF9-8CDCD308FA68].component.value", QueryParameterRewriteType.String);
        }

        /// <summary>
        /// Gets the extension URI
        /// </summary>
        public Uri Uri => new Uri(URI);

        /// <summary>
        /// Profile URI
        /// </summary>
        public Uri ProfileUri => new Uri(URI);

        /// <summary>
        /// Applies to 
        /// </summary>
        public ResourceType? AppliesTo => ResourceType.Patient;

        /// <summary>
        /// Construct the extension value
        /// </summary>
        public Extension Construct(IIdentifiedEntity modelObject)
        {
            if(modelObject is SanteDB.Core.Model.Roles.Patient patient)
            {
                var mother = patient.LoadCollection(o => o.Relationships).Where(o => o.RelationshipTypeKey == EntityRelationshipTypeKeys.Mother).FirstOrDefault().LoadProperty(o=>o.TargetEntity);

                if(mother != null)
                {
                    var maidenName = mother.LoadCollection(o => o.Names).FirstOrDefault(o => o.NameUseKey == NameUseKeys.MaidenName);
                    if(maidenName != null)
                    {
                        return new Extension(this.Uri.ToString(), new FhirString(maidenName.ToDisplay()));
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Parse the extension value
        /// </summary>
        public bool Parse(Extension fhirExtension, IdentifiedData modelObject)
        {
            throw new NotSupportedException($"This extension is readonly and is created via RelatedPerson. Please submit a RelatedPerson of realtionship MTH and name of use Maiden");
        }
    }
}
