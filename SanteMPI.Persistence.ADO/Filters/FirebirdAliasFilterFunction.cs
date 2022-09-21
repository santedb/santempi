using SanteDB.OrmLite;
using SanteDB.OrmLite.Providers;
using SanteDB.OrmLite.Providers.Firebird;
using System;
using System.Collections.Generic;
using System.Text;

namespace SanteMPI.Persistence.ADO.Filters
{
    /// <summary>
    /// Alias function for Firebird
    /// </summary>
    public class FirebirdAliasFilterFunction : IDbFilterFunction
    {
        /// <summary>
        /// Get the provider
        /// </summary>
        public string Provider => FirebirdSQLProvider.InvariantName;

        /// <summary>
        /// Get the name of the alias filter
        /// </summary>
        public string Name => "alias";

        /// <summary>
        /// Crete the SQL function
        /// </summary>
        public SqlStatement CreateSqlStatement(SqlStatement current, string filterColumn, string[] parms, string operand, Type operandType)
        {
            throw new NotImplementedException();
        }
    }
}
