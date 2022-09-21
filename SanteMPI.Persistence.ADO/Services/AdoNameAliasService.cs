using SanteDB.Core;
using SanteDB.Core.Configuration.Data;
using SanteDB.Core.Diagnostics;
using SanteDB.Core.Services;
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
        private AdoConfigurationSection m_configuration = ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetSection<AdoConfigurationSection>();

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
                        PrimaryName = name.ToLower(),
                        Synonym = alias.ToLower(),
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
                    dbContext.DeleteAll<DbNameAlias>(o => o.PrimaryName.ToLower() == name.ToLower() && o.Synonym.ToLower() == alias.ToLower());
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
                    var data = dbContext.Query<DbNameAlias>(o => o.PrimaryName.ToLower().Contains(filter));
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
