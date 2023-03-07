using SanteDB.Core.Configuration;
using SanteDB.Core.Configuration.Features;
using SanteMPI.Persistence.ADO.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace SanteMPI.Persistence.ADO.Configuration.Features
{
    /// <summary>
    /// Feature for SanteMPI configuration
    /// </summary>
    public class SanteMpiConfigurationFeature : GenericServiceFeature<AdoNameAliasService>
    {
        /// <summary>
        /// Gets the type of the configuration
        /// </summary>
        public override Type ConfigurationType => typeof(AdoConfigurationSection);

        /// <summary>
        /// Get the Group Name
        /// </summary>
        public override string Group => "SanteMPI";

        /// <summary>
        /// Get the default configuration
        /// </summary>
        protected override object GetDefaultConfiguration() => new AdoConfigurationSection()
        {
            TraceSql = false
        };
    }
}
