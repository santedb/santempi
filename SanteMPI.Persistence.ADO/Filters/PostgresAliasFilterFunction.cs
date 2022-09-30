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
            if (parms.Length != 1)
            {
                throw new ArgumentException("$1", ErrorMessages.ERR_MISSING_PARAMETER);
            }

            var match = new Regex(@"^([<>]?=?)(.*?)$").Match(operand);
            String op = match.Groups[1].Value, value = match.Groups[2].Value;
            if (String.IsNullOrEmpty(op))
            {
                op = "=";
            }

            return current.Append($"{filterColumn} = ? OR EXISTS (SELECT 1 FROM MPI_NAME_SYN_CDTBL SYN WHERE ({filterColumn} = SYN.PRI_NAME AND SYN.SYN_NAME = ? OR {filterColumn} = SYN.SYN_NAME AND SYN.PRI_NAME = ?) AND SYN.STRENGTH {op} ?)", QueryBuilder.CreateParameterValue(parms[0].ToUpper(), operandType), QueryBuilder.CreateParameterValue(parms[0].ToUpper(), operandType), QueryBuilder.CreateParameterValue(parms[0].ToUpper(), operandType), QueryBuilder.CreateParameterValue(value, typeof(decimal)));
        }
    }
}
