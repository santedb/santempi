using System;
using System.Collections.Generic;
using System.Text;
using SanteDB.OrmLite;
using SanteDB.OrmLite.Providers;
using SanteDB.OrmLite.Providers.Postgres;

namespace SanteMPI.Persistence.ADO.Filters
{
    /// <summary>
    /// PostgreSQL alias filter function
    /// </summary>
    public class PostgresAliasFilterFunction : IDbFilterFunction
    {
        /// <summary>
        /// Get the provider name for this
        /// </summary>
        public string Provider => PostgreSQLProvider.InvariantName;

        /// <summary>
        /// Get the name for the alias function
        /// </summary>
        public string Name => "alias";

        /// <summary>
        /// Create an SQL statement for the name alias function
        /// </summary>
        public SqlStatement CreateSqlStatement(SqlStatement current, string filterColumn, string[] parms, string operand, Type operandType)
        {
            throw new NotImplementedException();
        }
    }
}
