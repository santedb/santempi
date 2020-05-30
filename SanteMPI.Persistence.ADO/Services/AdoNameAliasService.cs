using SanteDB.Core;
using SanteDB.Core.Configuration.Data;
using SanteDB.Core.Diagnostics;
using SanteDB.Core.Services;
using SanteMPI.Persistence.ADO.Configuration;
using SanteMPI.Persistence.ADO.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Persistence.ADO.Services
{
    /// <summary>
    /// Alias provider using ORM Light
    /// </summary>
    public class AdoNameAliasService : IAliasProvider
    {
        /// <summary>
        /// Gets the name of the alias provider
        /// </summary>
        public string ServiceName => "SanteMPI Name Alias Provider";

        // Tracer
        private Tracer m_tracer = Tracer.GetTracer(typeof(AdoNameAliasService));

        // Get configuration
        private AdoConfigurationSection m_configuration = ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetSection<AdoConfigurationSection>();

        /// <summary>
        /// Get the specified alias for the repository
        /// </summary>
        public IEnumerable<ComponentAlias> GetAlias(string name)
        {
            try
            {
                name = name.ToLower();
                var connectionString = ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetSection<DataConfigurationSection>()?.ConnectionString;
                using(var dbContext = this.m_configuration.Provider.GetReadonlyConnection())
                {
                    return dbContext.Query<DbNameAlias>(o => o.PrimaryName.ToLower() == name)
                            .Union(dbContext.Query<DbNameAlias>(o => o.Synonym.ToLower() == name))
                            .Select(o => new ComponentAlias(o.PrimaryName.Equals(name, StringComparison.OrdinalIgnoreCase) ? o.Synonym : o.PrimaryName, o.Strength))
                            .ToList();
                }
            }
            catch(Exception e)
            {
                this.m_tracer.TraceError("Error fetching aliases for {0} - {1}", name, e);
                throw new Exception($"Error fetching name aliases for {name}", e);
            }
        }
    }
}
