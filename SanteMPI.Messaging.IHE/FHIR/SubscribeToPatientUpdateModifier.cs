using Hl7.Fhir.Model;
using SanteDB.Messaging.FHIR.Extensions;
using SanteMPI.Messaging.IHE.Audit;
using System;
using System.Collections.Generic;
using System.Text;

namespace SanteMPI.Messaging.IHE.FHIR
{
    /// <summary>
    /// Simple modifier which adds appropriate auditing
    /// </summary>
    /// <remarks>This modifier simply ensures that an appropriate audit is sent for the subscription message</remarks>
    public class SubscribeToPatientUpdateModifier : IFhirRestBehaviorModifier
    {
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
                if (responseResource is Subscription subscription && subscription.ResourceType == ResourceType.Patient)
                {
                    IheAuditUtil.SendSubscribeToPatientUpdates(SanteDB.Core.Auditing.OutcomeIndicator.Success, interaction, subscription);
                }
            }
            return responseResource;
        }

        /// <summary>
        /// Can apply this audit modifier?
        /// </summary>
        public bool CanApply(CapabilityStatement.TypeRestfulInteraction interaction, Resource resource) => resource is Subscription subscription &&
            subscription.ResourceType == ResourceType.Patient;
    }
}
