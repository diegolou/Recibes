namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class GetPositionPackerCustomerRequest
    {
        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PackerId_Required")]
        public string PackerId { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "ActivityId_Required")]
        public string ActivityId { get; set; }
    }
}