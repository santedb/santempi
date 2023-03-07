using Hl7.Fhir.Model;
using RestSrvr;
using SanteDB;
using SanteDB.Core.Model;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Model.DataTypes;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Messaging.FHIR.Exceptions;
using SanteDB.Messaging.FHIR.Extensions;
using SanteDB.Messaging.FHIR.Util;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// IHE PIXm Operation
    /// </summary>
    [DisplayName("IHE PIXm Operation Handler")]
    public class PatientIdentityCrossReferenceMobileOperation : IFhirOperationHandler
    {
        private readonly IAuditService m_auditService;

        // Patient repository
        private readonly IRepositoryService<SanteDB.Core.Model.Roles.Patient> m_patientRepository;
        private readonly IIdentityDomainRepositoryService m_assigningAuthorityRepository;

        /// <summary>
        /// Creates a new patient identity cross reference service
        /// </summary>
        public PatientIdentityCrossReferenceMobileOperation(IIdentityDomainRepositoryService assigningAuthorityRepositoryService, IRepositoryService<SanteDB.Core.Model.Roles.Patient> repositoryService
            , IAuditService auditService)
        {
            this.m_auditService = auditService;
            this.m_patientRepository = repositoryService;
            this.m_assigningAuthorityRepository = assigningAuthorityRepositoryService;
        }

        /// <summary>
        /// Gets the name of the operation
        /// </summary>
        public string Name => "ihe-pix";

        /// <summary>
        /// Get the parameters for this
        /// </summary>
        public IDictionary<String, FHIRAllTypes> Parameters => new Dictionary<String, FHIRAllTypes>()
        {
            {  "sourceIdentifier", FHIRAllTypes.String },
            { "targetSystem", FHIRAllTypes.String }
        };
        /// <summary>
        /// Get whether this operation is a GET operation
        /// </summary>
        public bool IsGet => true;

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
            try
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
                var result = this.m_patientRepository.Find(o => o.Identifiers.Any(i => i.IdentityDomain.Key == sourceDomain.Key && i.Value == sourceId));
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

                var retVal = new Parameters();

                foreach (var res in result)
                {
                    IEnumerable<EntityIdentifier> identifierList = authorityList.Any() ? 
                        res.LoadCollection(o => o.Identifiers).Where(i => authorityList.Contains(i.IdentityDomainKey.Value)) : 
                        res.LoadCollection(o => o.Identifiers);

                    // Identifiers
                    foreach (var id in identifierList)
                    {
                        retVal.Add("targetIdentifier", DataTypeConverter.ToFhirIdentifier(id));
                    }

                    retVal.Add("targetId", DataTypeConverter.CreateNonVersionedReference<Patient>(res));
                }

                this.m_auditService.Audit().ForPatientIdentityXrefMobile(OutcomeIndicator.Success, result.OfType<Patient>()).Send();
                return retVal;
            }
            catch (Exception)
            {
                this.m_auditService.Audit().ForPatientIdentityXrefMobile(OutcomeIndicator.MinorFail, new Patient[0]);
                throw;
            }
        }
    }
}
