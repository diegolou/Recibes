// <copyright file="SendPackageResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities.Responses
{
    /// <summary>
    /// SendPackageResponse
    /// </summary>
    public class SendPackageResponse
    {
        /// <summary>
        /// Gets or sets activityId.
        /// </summary>
        public string ActivityId { get; set; }

        /// <summary>
        /// Gets or sets reference.
        /// </summary>
        public string Reference { get; set; }

        /// <summary>
        /// Gets or sets paymentId.
        /// </summary>
        public string PaymentId { get; set; }

        /// <summary>
        /// Gets or sets totalP.
        /// </summary>
        public double TotalP { get; set; }

        /// <summary>
        /// Gets or sets paymentT.
        /// </summary>
        public string PaymentT { get; set; }

        /// <summary>
        /// Gets or sets taxes.
        /// </summary>
        public double Taxes { get; set; }

        /// <summary>
        /// Gets or sets origen.
        /// </summary>
        public string Origen { get; set; }
    }
}