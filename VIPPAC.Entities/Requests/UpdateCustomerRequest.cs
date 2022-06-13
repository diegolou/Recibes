namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class UpdateCustomerRequest
    {
        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Role_Required")]
        public string IdType { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Role_Required")]
        public long IdNumber { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "FirstName_Required")]
        public string FirstName { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Role_Required")]
        public string Profile { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "EmailAddress_Required")]
        [RegularExpression(@"^(([^<>()\[\]\\.,;:\s@""]+(\.[^<>()\[\]\\.,;:\s@""]+)*)|("".+""))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$", ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "EmailAddress_FormatEmail")]
        public string Email { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Mobile_Required")]
        public long Mobile { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "AddressInfo_Required")]
        public AddressInfo AddressesInfo { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "ReteFuenteo_Required")]
        public bool ReteFuente { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "ReteIca_Required")]
        public bool ReteIca { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string ActaReteFuente { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string ActaReteIca { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Company_Required")]
        public bool Company { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "CountryCode_Required")]
        public int CountryCode { get; set; }
    }
}