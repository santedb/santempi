using SanteDB.Core;
using SanteDB.Core.Configuration.Data;
using SanteDB.Core.Diagnostics;
using SanteDB.Core.Services;
using SanteDB.OrmLite.Migration;
using SanteMPI.Persistence.ADO.Configuration;
using SanteMPI.Persistence.ADO.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
        private readonly AdoConfigurationSection m_configuration;

        /// <summary>
        /// DI constructor
        /// </summary>
        public AdoNameAliasService(IConfigurationManager configurationManager)
        {
            this.m_configuration = configurationManager.GetSection<AdoConfigurationSection>();
            // Upgrade the schema
            this.m_tracer.TraceInfo("Installing SanteMPI Name Aliasing Tables...");
            this.m_configuration.Provider.UpgradeSchema("SanteMPI.Persistence.Data");

        }

        /// <summary>
        /// Get the specified alias for the repository
        /// </summary>
        public IEnumerable<ComponentAlias> GetAlias(string name)
        {
            try
            {
                name = name.ToLower();
                using(var dbContext = this.m_configuration.Provider.GetReadonlyConnection())
                {
                    return dbContext.Query<DbNameAlias>(o => o.PrimaryName.ToUpper() == name)
                            .Union(dbContext.Query<DbNameAlias>(o => o.Synonym.ToUpper() == name))
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

        /// <summary>
        /// Add an alias to the ADO provider
        /// </summary>
        public void AddAlias(string name, string alias, double weight)
        {
            try
            {
                using (var dbContext = this.m_configuration.Provider.GetWriteConnection())
                {
                    var dbNameAlias = new DbNameAlias()
                    {
                        PrimaryName = name.ToUpper(),
                        Synonym = alias.ToUpper(),
                        Strength = (float)weight
                    };
                    dbContext.Insert(dbNameAlias);
                }
            }
            catch (Exception e)
            {
                this.m_tracer.TraceError("Error adding aliases for {0} - {1}", name, e);
                throw new Exception($"Error adding name aliases for {name}", e);
            }
        }

        /// <summary>
        /// Removes the specified name aliases
        /// </summary>
        public void RemoveAlias(string name, string alias)
        {
            try
            {
                using (var dbContext = this.m_configuration.Provider.GetWriteConnection())
                {
                    dbContext.DeleteAll<DbNameAlias>(o => o.PrimaryName.ToUpper() == name.ToUpper() && o.Synonym.ToUpper() == alias.ToUpper());
                }
            }
            catch (Exception e)
            {
                this.m_tracer.TraceError("Error removing aliases for {0} - {1}", name, e);
                throw new Exception($"Error removing name aliases for {name}", e);
            }

        }

        /// <summary>
        /// Get all aliases for the specified name alias
        /// </summary>
        public IDictionary<string, IEnumerable<ComponentAlias>> GetAllAliases(string filter, int offset, int? count, out int totalResults)
        {
            try
            {
                using (var dbContext = this.m_configuration.Provider.GetWriteConnection())
                {
                    filter = filter.ToLower();
                    var data = dbContext.Query<DbNameAlias>(o => o.PrimaryName.ToUpper().Contains(filter));
                    totalResults = data.Count();
                    return data.Skip(offset).Take(count ?? 100).ToArray().GroupBy(o => o.PrimaryName).ToDictionary(o => o.Key, o => o.Select(c => new ComponentAlias(c.Synonym, c.Strength)).AsEnumerable());
                }
            }
            catch (Exception e)
            {
                this.m_tracer.TraceError("Error querying aliases for {0} - {1}", filter, e);
                throw new Exception($"Error querying name aliases for {filter}", e);
            }

        }
    }
}
