﻿using SanteDB.OrmLite;
using SanteDB.OrmLite.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanteMPI.Persistence.ADO.Data
{
    /// <summary>
    /// Filter for database function
    /// </summary>
    public class PgsqlAliasFunction : IDbFilterFunction
    {
        /// <summary>
        /// Gets the provider for this function
        /// </summary>
        public string Provider => "pgsql";

        /// <summary>
        /// Get the name
        /// </summary>
        public string Name => "alias";

        /// <summary>
        /// Create the specified sql statement
        /// </summary>
        public SqlStatement CreateSqlStatement(SqlStatement current, string filterColumn, string[] parms, string operand, Type operandType)
        {
            if (parms.Length != 1)
                throw new ArgumentException("alias requires one parameter");
            else
            {
                return current.Append($"EXISTS (SELECT 1 FROM MPI_NAME_SYN_CDTBL WHERE LOWER(pri_name) = LOWER(?) AND LOWER(syn_name) = LOWER({filterColumn}) OR LOWER(pri_name) = LOWER({filterColumn}) LOWER(syn_name) = LOWER(?))", parms[0], parms[0]);
            }
        }
    }

    /// <summary>
    /// Filter for database function
    /// </summary>
    public class FbsqlAliasFunction : IDbFilterFunction
    {
        /// <summary>
        /// Gets the provider for this function
        /// </summary>
        public string Provider => "fbsql";

        /// <summary>
        /// Get the name
        /// </summary>
        public string Name => "alias";

        /// <summary>
        /// Create the specified sql statement
        /// </summary>
        public SqlStatement CreateSqlStatement(SqlStatement current, string filterColumn, string[] parms, string operand, Type operandType)
        {
            if (parms.Length != 1)
                throw new ArgumentException("alias requires one parameter");
            else
            {
                return current.Append($"EXISTS (SELECT 1 FROM MPI_NAME_SYN_CDTBL WHERE LOWER(pri_name) = LOWER(?) AND LOWER(syn_name) = LOWER({filterColumn}) OR LOWER(pri_name) = LOWER({filterColumn}) LOWER(syn_name) = LOWER(?))", parms[0], parms[0]);
            }
        }
    }
}
