using Hl7.Fhir.Model;
using SanteDB.Core;
using SanteDB.Core.BusinessRules;
using SanteDB.Core.Exceptions;
using SanteDB.Core.Interfaces;
using SanteDB.Core.Model.Constants;
using SanteDB.Core.Model.Entities;
using SanteDB.Core.Services;
using SanteDB.Messaging.FHIR;
using SanteDB.Messaging.FHIR.Extensions;
using SanteDB.Messaging.FHIR.Handlers;
using SanteDB.Messaging.FHIR.Util;
using SanteMPI.i18n;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using static Hl7.Fhir.Model.Bundle;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// A FHIR operation handler which creates a new patient from an inbound message
    /// </summary>
    public class PatientMasterIdentityOperation : IFhirMessageOperation
    {

        // Error strings
        private ResourceManager m_errorStrings = new ResourceManager(typeof(ErrorMessages));

        // Repository service
        private IRepositoryService<SanteDB.Core.Model.Roles.Patient> m_repository;
        private IRecordMergingService<SanteDB.Core.Model.Roles.Patient> m_mergeService;
        private IRepositoryService<SanteDB.Core.Model.Collection.Bundle> m_batchRepository;

        // Bundle handler
        private BundleResourceHandler m_bundleHandler;

        // The methods allowed on this interface
        private readonly HTTPVerb[] RequestMethods = new HTTPVerb[] { HTTPVerb.DELETE, HTTPVerb.POST, HTTPVerb.PUT };

        /// <summary>
        /// Patient master identity operation
        /// </summary>
        public PatientMasterIdentityOperation(IServiceManager serviceManager)
        {
            this.m_repository = ApplicationServiceContext.Current.GetService<IRepositoryService<SanteDB.Core.Model.Roles.Patient>>();
            this.m_bundleHandler = serviceManager.CreateInjected<BundleResourceHandler>();
            this.m_batchRepository = ApplicationServiceContext.Current.GetService<IRepositoryService<SanteDB.Core.Model.Collection.Bundle>>();
            this.m_mergeService = ApplicationServiceContext.Current.GetService<IRecordMergingService<SanteDB.Core.Model.Roles.Patient>>();
        }

        /// <summary>
        /// Create a detected issue event exception
        /// </summary>
        private DetectedIssueException CreateDetectedIssueException(String issueId)
        {
            return new DetectedIssueException(new SanteDB.Core.BusinessRules.DetectedIssue(
                DetectedIssuePriorityType.Error,
                issueId,
                this.m_errorStrings.GetString(issueId),
                DetectedIssueKeys.FormalConstraintIssue
                )
            );
        }
        /// <summary>
        /// The event URI
        /// </summary>
        public Uri EventUri => new Uri("urn:ihe:iti:pmir:2019:patient-feed");

        /// <summary>
        /// Invoke the operation itself
        /// </summary>
        public Resource Invoke(MessageHeader requestHeader, params Bundle.EntryComponent[] entries)
        {
            // Validate the message contents
            if (entries.Length != 1)
            {
                throw new ArgumentException(ErrorMessages.ERR_ITI93_PARAMETER);
            }

            // Get the parameter bundle
            var bundle = entries.First().Resource as Bundle;
            if (bundle.Type != Bundle.BundleType.History)
            {
                throw this.CreateDetectedIssueException(nameof(ErrorMessages.ERR_ITI93_BUNDLE_TYPE));
            }
            else if (bundle.Entry.Count == 0)
            {
                throw new ArgumentException(ErrorMessages.ERR_ITI93_PARAMETER);
            }
            else if (bundle.Entry.Select(o => o.FullUrl).Distinct().Count() != bundle.Entry.Count())
            {
                throw this.CreateDetectedIssueException(nameof(ErrorMessages.ERR_ITI93_UNIQUE));
            }
            else if (bundle.Entry.Any(o => !this.RequestMethods.Contains(o.Request?.Method.GetValueOrDefault() ?? HTTPVerb.HEAD)))
            {
                throw this.CreateDetectedIssueException(nameof(ErrorMessages.ERR_ITI93_METHOD));
            }

            // Create SanteDB bundle of objects to be persisted
            // This is done because the odd way FHIR does RelatedPerson linkages, we want to process the entire bundle and let the mapper handle resolving 
            var sdbBundle = this.m_bundleHandler.MapToModel(bundle) as SanteDB.Core.Model.Collection.Bundle;

            OperationOutcome retVal = new OperationOutcome();

            // Patient handler
            // Entry for bundle
            foreach (var itm in bundle.Entry.Where(o => o.Resource is Patient))
            {
                // Get the converted object
                var focalObject = sdbBundle.Item.OfType<SanteDB.Core.Model.Roles.Patient>().FirstOrDefault(o => o.GetTag(FhirConstants.OriginalUrlTag) == itm.FullUrl);
                if (focalObject == null)
                {
                    throw new InvalidOperationException("Shouldn't be here - Cannot find converted object - Is the patient missing a fullUrl?");
                }

                // HACK: Attempt to try and determine what the sender is trying to convey? Is it a merge? Is it an update?
                // Is it a create? We don't know, so try to determine based on the attributes in the message.
                switch (itm.Request.Method)
                {
                    case HTTPVerb.POST:
                    case HTTPVerb.PUT: // Might be a merge or might be an update?
                        {
                            // PMIR -> Replaced By is a link that exists on the focal object 
                            var fhirPatientReplacementInstruction = (itm.Resource as Patient).Link.FirstOrDefault(l => l.Type == Patient.LinkType.ReplacedBy);
                            if (fhirPatientReplacementInstruction != null) // Requesting a replacement
                            {
                                var survivor = DataTypeConverter.ResolveEntity(fhirPatientReplacementInstruction.Other, itm.Resource);
                                if (survivor == null)
                                {
                                    throw new InvalidOperationException(ErrorMessages.ERR_ITI93_MERGE_TARGET_UNKNOWN);
                                }
                                this.m_mergeService.Merge(survivor.Key.Value, new Guid[] { focalObject.Key.Value });
                                retVal.Issue.Add(new OperationOutcome.IssueComponent()
                                {
                                    Severity = OperationOutcome.IssueSeverity.Information,
                                    Diagnostics = $"Merge {focalObject.Key} -> {survivor.Key}"
                                });
                            }
                            else
                            {
                                // Get all objects which the object depends on this one and don't include replaces (since that is merge instructions in this profile)
                                var dependentObjects = sdbBundle.Item.OfType<Entity>().Where(o => o.Relationships.Any(r => r.SourceEntityKey == focalObject.Key || r.TargetEntityKey == focalObject.Key));
                                var sdbTransaction = new SanteDB.Core.Model.Collection.Bundle();
                                sdbTransaction.Add(focalObject);
                                sdbTransaction.Item.AddRange(dependentObjects);
                                this.m_batchRepository.Insert(sdbTransaction);
                                retVal.Issue.Add(new OperationOutcome.IssueComponent()
                                {
                                    Severity = OperationOutcome.IssueSeverity.Information,
                                    Diagnostics = $"Register/Update {focalObject}"
                                });
                            }
                            break;
                        }
                    case HTTPVerb.DELETE:
                        {
                            this.m_repository.Obsolete(focalObject.Key.Value);
                            retVal.Issue.Add(new OperationOutcome.IssueComponent()
                            {
                                Severity = OperationOutcome.IssueSeverity.Information,
                                Diagnostics = $"Deleted {focalObject}"
                            });
                            break;
                        }
                    default:
                        throw new InvalidOperationException();
                }
            }

            return retVal;
        }
    }
}
