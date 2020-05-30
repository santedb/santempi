using SanteDB.Core;
using SanteDB.Core.Configuration;
using SanteDB.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace SanteMPI.Persistence.ADO.Configuration
{
    /// <summary>
    /// MPI Ado Configuration section
    /// </summary>
    [XmlType(nameof(AdoConfigurationSection), Namespace = "http://santedb.org/configuration/santempi")]
    public class AdoConfigurationSection : SanteDB.OrmLite.Configuration.OrmConfigurationBase, IConfigurationSection
    {
        /// <summary>
        /// Resolve the connection string
        /// </summary>
        protected override string ResolveConnectionString(string connectionStringName)
        {
            return ApplicationServiceContext.Current.GetService<IConfigurationManager>().GetConnectionString(connectionStringName)?.Value;
        }
    }
}
