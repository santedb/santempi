using SanteDB.OrmLite.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Persistence.ADO.Data.Model
{
    /// <summary>
    /// Name alias registration
    /// </summary>
    [Table("mpi_name_syn_cdtbl")]
    public class DbNameAlias
    {
        /// <summary>
        /// Primary name reference
        /// </summary>
        [Column("pri_name"), PrimaryKey]
        public String PrimaryName { get; set; }

        /// <summary>
        /// Primary name reference
        /// </summary>
        [Column("syn_name"), PrimaryKey]
        public String Synonym { get; set; }

        /// <summary>
        /// GEts the strength
        /// </summary>
        [Column("strength")]
        public float Strength { get; set; }

    }
}
