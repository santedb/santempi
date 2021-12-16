using SanteDB.Core.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Xml.Serialization;

namespace SanteMPI.Persistence.ADO.Configuration
{
    /// <summary>
    /// MPI Ado Configuration section
    /// </summary>
    [ExcludeFromCodeCoverage]
    [XmlType(nameof(AdoConfigurationSection), Namespace = "http://santedb.org/configuration/santempi")]
    public class AdoConfigurationSection : SanteDB.OrmLite.Configuration.OrmConfigurationBase, IConfigurationSection
    {
       
    }
}
