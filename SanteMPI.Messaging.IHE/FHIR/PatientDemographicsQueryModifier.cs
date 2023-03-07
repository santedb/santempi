using Hl7.Fhir.Model;
using RestSrvr;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Core.Services;
using SanteDB.Messaging.FHIR.Extensions;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// The mother's maiden name
    /// </summary>
    [DisplayName("IHE PDQm Patient Query Modifier")]
    public class PatientDemographicsQueryModifier : IFhirRestBehaviorModifier
    {
        private readonly IAuditService m_auditService;

        // Authority repository
        private readonly IIdentityDomainRepositoryService m_authorityRepository;

        /// <summary>
        /// Mother's maiden name
        /// </summary>
        public PatientDemographicsQueryModifier(IIdentityDomainRepositoryService authorityRepository, IAuditService auditService)
        {
            this.m_auditService = auditService;
            this.m_authorityRepository = authorityRepository;
        }

        /// <summary>
        /// After receiving a request (not applicable for PDQM)
        /// </summary>
        public Resource AfterReceiveRequest(CapabilityStatement.TypeRestfulInteraction interaction, ResourceType resourceType, Resource requestResource)
        {
            return requestResource;
        }

        /// <summary>
        /// Before sending the response
        /// </summary>
        /// <remarks>
        /// This function implements the "WHAT DOMAINS RETURNED" behavior on result sets as described in TF 3.78.4.1.2.4
        /// </remarks>
        public Resource BeforeSendResponse(CapabilityStatement.TypeRestfulInteraction interaction, ResourceType resourceType, Resource responseResource)
        {
            try
            {
                if (resourceType == ResourceType.Patient)
                {
                    if (responseResource is Patient patient)
                    {
                        // Was the original query reqest include a "WHAT DOMAINS RETURNED" parameter
                        var whatDomains = RestOperationContext.Current?.IncomingRequest.QueryString["identifier"];
                        if (String.IsNullOrEmpty(whatDomains))
                        {
                            return responseResource;
                        }

                        // Get domains
                        var domainsToReturn = whatDomains.Split(',').Select(o => o.Split('|')).Where(o => o.Length == 1 || String.IsNullOrEmpty(o[1])).Select(o => o[0]);
                        if (!domainsToReturn.Any())
                        {
                            return responseResource;
                        }
                        else
                        {
                            var aaDomains = domainsToReturn.Select(itm =>
                            {
                                var aa = this.m_authorityRepository.Get(itm);
                                if (aa == null)
                                {
                                    throw new KeyNotFoundException($"Authority {itm} not recognized");
                                }
                                return aa;
                            });
                            patient.Identifier.RemoveAll(o => !aaDomains.Any(d => d.Url == o.System || $"urn:oid:{d.Oid}" == o.System));

                            if (patient.Identifier.Count == 0)
                            {
                                return null; // no identifiers so the object should not appear
                            }
                            return patient;
                        }
                    }
                    else if (responseResource is Bundle bundle)
                    {
                        foreach (var res in bundle.Entry.ToArray())
                        {
                            var resource = this.BeforeSendResponse(interaction, resourceType, res.Resource);
                            if (resource == null)
                            {
                                bundle.Entry.Remove(res);
                            }
                        }

                        // We want to audit this operation according to the ITI
                        this.m_auditService.Audit().ForPatientDemographicsQueryMobile(OutcomeIndicator.Success, bundle.Entry.OfType<Patient>()).Send();
                        return bundle;
                    }
                    else
                    {
                        return responseResource;
                    }
                }
                else
                {
                    return responseResource;
                }

            }
            catch
            {
                this.m_auditService.Audit().ForPatientDemographicsQueryMobile(OutcomeIndicator.MinorFail, new Patient[0]).Send();
                throw;
            }
        }

        /// <summary>
        /// Get whether the application applies
        /// </summary>
        public bool CanApply(CapabilityStatement.TypeRestfulInteraction interaction, Resource resource) =>
            (interaction == CapabilityStatement.TypeRestfulInteraction.SearchType || interaction == CapabilityStatement.TypeRestfulInteraction.Read) &&
            (resource is Patient || resource is Bundle);
    }
}
