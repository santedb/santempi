using SanteDB.OrmLite;
using SanteDB.OrmLite.Providers;
using SanteDB.OrmLite.Providers.Firebird;
using SanteMPI.i18n;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

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
            if(parms.Length != 1)
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
