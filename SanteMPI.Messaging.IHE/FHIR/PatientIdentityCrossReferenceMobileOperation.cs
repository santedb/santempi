using Hl7.Fhir.Model;
using RestSrvr;
using SanteDB.Core.Model;
using SanteDB.Core.Model.DataTypes;
using SanteDB.Core.Services;
using SanteDB.Messaging.FHIR.Exceptions;
using SanteDB.Messaging.FHIR.Extensions;
using SanteDB.Messaging.FHIR.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// IHE PIXm Operation
    /// </summary>
    public class PatientIdentityCrossReferenceMobileOperation : IFhirOperationHandler
    {

        // Patient repository
        private IRepositoryService<SanteDB.Core.Model.Roles.Patient> m_patientRepository;
        private IAssigningAuthorityRepositoryService m_assigningAuthorityRepository;

        /// <summary>
        /// Creates a new patient identity cross reference service
        /// </summary>
        public PatientIdentityCrossReferenceMobileOperation(IAssigningAuthorityRepositoryService assigningAuthorityRepositoryService, IRepositoryService<SanteDB.Core.Model.Roles.Patient> repositoryService)
        {
            this.m_patientRepository = repositoryService;
            this.m_assigningAuthorityRepository = assigningAuthorityRepositoryService;
        }

        /// <summary>
        /// Gets the name of the operation
        /// </summary>
        public string Name => "ihe-pix";

        /// <summary>
        /// Gets the URI of the definition
        /// </summary>
        public Uri Uri => new Uri("http://santedb.org/fhir/ihe/pixm");

        /// <summary>
        /// Applies to resource
        /// </summary>
        public ResourceType[] AppliesTo => new ResourceType[] { ResourceType.Patient };

        /// <summary>
        /// Invoke the specified operation
        /// </summary>
        public Resource Invoke(Parameters parameters)
        {
            // First - Let's get the parameters
            var sourceIdentifier = RestOperationContext.Current.IncomingRequest.QueryString["sourceIdentifier"]?.Split('|');
            if (sourceIdentifier == null || sourceIdentifier.Length != 2 || !Uri.TryCreate(sourceIdentifier[0], UriKind.Absolute, out Uri sourceDomainUri))
            {
                throw new ArgumentException("sourceIdentifier");
            }

            // Lookup identity domain
            var sourceDomain = this.m_assigningAuthorityRepository.Get(sourceDomainUri);
            var sourceId = sourceIdentifier[1];

            if (sourceDomain == null)
            {
                throw new FhirException(System.Net.HttpStatusCode.BadRequest, OperationOutcome.IssueType.CodeInvalid, $"{sourceDomain} Assigning Authority not found");
            }

            // Attempt to find the patient
            var result = this.m_patientRepository.Find(o => o.Identifiers.Any(i => i.Authority.Key == sourceDomain.Key && i.Value == sourceId));
            if (!result.Any())
            {
                throw new FhirException(System.Net.HttpStatusCode.NotFound, OperationOutcome.IssueType.NotFound, $"{sourceDomain}|{sourceId} Patient Identifier not found");
            }


            var targetSystems = RestOperationContext.Current.IncomingRequest.QueryString.GetValues("targetSystem");
            Guid[] authorityList = new Guid[0];
            if (targetSystems?.Any() == true)
            {
                var targetSystemUris = targetSystems.Select(o => new Uri(o));
                authorityList = targetSystemUris.Select(o =>
                {
                    var auth = this.m_assigningAuthorityRepository.Get(o);
                    if (auth == null)
                    {
                        throw new FhirException(System.Net.HttpStatusCode.Forbidden, OperationOutcome.IssueType.CodeInvalid, $"{o} not found");
                    }
                    return auth;
                }).Select(o => o.Key.Value).ToArray();
            }

            Parameters retVal = new Parameters();
            foreach (var res in result)
            {
                IEnumerable<EntityIdentifier> identifierList = null;
                if (authorityList.Any())
                {
                    identifierList = res.LoadCollection(o => o.Identifiers).Where(i => authorityList.Contains(i.AuthorityKey.Value));
                }
                else
                {
                    identifierList = res.LoadCollection(o => o.Identifiers);
                }

                // Identifiers
                foreach (var id in identifierList)
                {
                    retVal.Add("targetIdentifier", DataTypeConverter.ToFhirIdentifier(id));
                }
                retVal.Add("targetId", DataTypeConverter.CreateNonVersionedReference<Patient>(res));
            }

            return retVal;
        }
    }
}
