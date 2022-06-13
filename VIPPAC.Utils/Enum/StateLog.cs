// <copyright file="StateLog.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Utils.Enum
{
    using System.ComponentModel;

    /// <summary>
    /// StateLog.
    /// </summary>
    public enum StateLog
    {
        /// <summary>
        /// Ok.
        /// </summary>
        [Description("Correct transaction")]
        Ok = 0,

        /// <summary>
        /// Error.
        /// </summary>
        [Description("Transaction failed")]
        Error = 1,

        /// <summary>
        /// Process.
        /// </summary>
        [Description("Transaction in Process")]
        Process = 2,

        /// <summary>
        /// Reverse.
        /// </summary>
        [Description("Transaction in reversed")]
        Reverse = 3,
    }
}