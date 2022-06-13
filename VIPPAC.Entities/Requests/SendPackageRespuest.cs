namespace VIPPAC.Entities.Requests
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    /// <summary>
    /// SendPackageRespuest.
    /// </summary>
    public class SendPackageRespuest
    {
        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "CustomerId_Required")]
        public string CustomerId { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "AddressInfo_Required")]
        public List<AddressInfo> AddressesInfo { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Remarks_Required")]
        public string Remark { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "SendDate_Required")]
        public DateTime SendDate { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "TotalDistance_Required")]
        public decimal TotalDistance { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PaymentId_Required")]
        public string PaymentId { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PaymentDetail_Required")]
        public PaymentRequest Payment { get; set; }

        /// <summary>
        /// Gets or sets.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Payment_Required")]
        public PaymentDetailRequest PaymentDetail { get; set; }
    }
}