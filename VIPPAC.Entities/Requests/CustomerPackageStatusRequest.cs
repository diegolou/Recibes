namespace VIPPAC.Entities.Requests
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class CustomerPackageStatusRequest
    {   //TODO:se debe adicionar el manejo de errores
        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "CustomerId_Required")]
        public string CustomerId { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "FilterType_Required")]
        public int FilterType { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime BDateFilter { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime EDateFilter { get; set; }
    }
}