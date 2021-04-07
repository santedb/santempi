using SanteDB.Core.Configuration;
using SanteDB.Messaging.HL7.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Messaging.IHE.Configuration
{
    /// <summary>
    /// The SanteMPI configuration feature
    /// </summary>
    public class PixPdqFeature : IFeature
    {
        /// <summary>
        /// Gets the name of the feature
        /// </summary>
        public string Name => "IHE PIX/PDQv2 Implementations";

        /// <summary>
        /// Gets the description of the feature
        /// </summary>
        public string Description => "Configures the SanteMPI handlers for IHE PIX/PDQ";

        /// <summary>
        /// Gets or sets the groups
        /// </summary>
        public string Group => "Solutions";

        /// <summary>
        /// Gets the configuration type
        /// </summary>
        public Type ConfigurationType => typeof(Hl7ConfigurationSection);

        /// <summary>
        /// Gets or sets the configuration options
        /// </summary>
        public object Configuration { get; set; }

        /// <summary>
        /// Flags for this features
        /// </summary>
        public FeatureFlags Flags => FeatureFlags.AutoSetup;

        /// <summary>
        /// Create installation tasks
        /// </summary>
        public IEnumerable<IConfigurationTask> CreateInstallTasks()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Create un-installation features
        /// </summary>
        public IEnumerable<IConfigurationTask> CreateUninstallTasks()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Queries the installation status 
        /// </summary>
        public FeatureInstallState QueryState(SanteDBConfiguration configuration)
        {
            throw new NotImplementedException();
        }
    }
}
