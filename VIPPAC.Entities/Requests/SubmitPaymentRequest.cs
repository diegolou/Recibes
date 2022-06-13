// <copyright file="SubmitPaymentRequest.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace VIPPAC.Entities.Requests
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    /// <summary>
    /// SubmitPaymentRequest.
    /// </summary>
    public class SubmitPaymentRequest
    {
        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "CustomerId_Required")]
        public string CustomerId { get; set; }

        /// <summary>
        /// Gets or sets activityId.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "ActivityId_Required")]
        public Guid ActivityId { get; set; }

        /// <summary>
        /// Gets or sets reference.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Reference_Required")]
        public string Reference { get; set; }

        /// <summary>
        /// Gets or sets paymentId.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PaymentId_Required")]
        public string PaymentId { get; set; }

        /// <summary>
        /// Gets or sets paymentState.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PaymentState_Required")]
        public string PaymentState { get; set; }

        /// <summary>
        /// Gets or sets paymentValue.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PaymentValue_Required")]
        public double PaymentValue { get; set; }

        /// <summary>
        /// Gets or sets otherInfo.
        /// </summary>
        public string OtherInfo { get; set; }
    }
}