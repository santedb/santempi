using Hl7.Fhir.Model;
using SanteDB.Core.Model.Audit;
using SanteDB.Core.Security;
using SanteDB.Core.Security.Services;
using SanteDB.Messaging.FHIR.Extensions;
using SanteMPI.Messaging.IHE.Audit;
using System.ComponentModel;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// Simple modifier which adds appropriate auditing
    /// </summary>
    /// <remarks>This modifier simply ensures that an appropriate audit is sent for the subscription message</remarks>
    [DisplayName("IHE PMIR Subscription Handler")]
    public class SubscribeToPatientUpdateModifier : IFhirRestBehaviorModifier
    {
        private readonly IAuditService m_auditService;

        /// <summary>
        /// DI constructor
        /// </summary>
        public SubscribeToPatientUpdateModifier(IAuditService auditService)
        {
            this.m_auditService = auditService;
        }

        /// <summary>
        /// After request is received
        /// </summary>
        public Resource AfterReceiveRequest(CapabilityStatement.TypeRestfulInteraction interaction, ResourceType resourceType, Resource requestResource)
        {
            return requestResource;
        }

        /// <summary>
        /// Before sending the response
        /// </summary>
        public Resource BeforeSendResponse(CapabilityStatement.TypeRestfulInteraction interaction, ResourceType resourceType, Resource responseResource)
        {
            if (resourceType == ResourceType.Subscription) // only apply if the request was to subscription
            {
                
                if (responseResource is Subscription subscription && subscription.Criteria.StartsWith("Patient"))
                {
                    this.m_auditService.Audit().ForSubscribeToPatientUpdate(OutcomeIndicator.Success, interaction, subscription).Send();
                }
            }
            return responseResource;
        }

        /// <summary>
        /// Can apply this audit modifier?
        /// </summary>
        public bool CanApply(CapabilityStatement.TypeRestfulInteraction interaction, Resource resource) => resource is Subscription subscription &&
            subscription.Criteria.StartsWith("Patient");
    }
}
