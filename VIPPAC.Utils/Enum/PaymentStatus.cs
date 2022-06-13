// <copyright file="PaymentStatus.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Utils.Enum
{
    /// <summary>
    /// StatePayment.
    /// </summary>
    public static class PaymentStatus
    {
        /// <summary>
        /// Gets pending.
        /// </summary>
        public static string Pending { get => "PE"; }

        /// <summary>
        /// Gets Available.
        /// </summary>
        public static string Available { get => "AV"; }

        /// <summary>
        /// Gets Voided.
        /// </summary>
        public static string Voided { get => "VO"; }

        /// <summary>
        /// Gets Declined.
        /// </summary>
        public static string Declined { get => "DE"; }

        /// <summary>
        /// Gets Aproved.
        /// </summary>
        public static string Approved { get => "AP"; }

        /// <summary>
        /// Gets Error.
        /// </summary>
        public static string Error { get => "ER"; }
    }
}