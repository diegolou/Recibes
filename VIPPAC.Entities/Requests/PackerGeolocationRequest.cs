namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class PackerGeolocationRequest
    {
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "PackerId_Required")]
        public string PackerId { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "ActivityId_Required")]
        public string ActivityId { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Latitude_Required")]
        public decimal Latitude { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Longitude_Required")]
        public decimal Longitude { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Altitude_Required")]
        public decimal Altitude { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Altitude_Required")]
        public decimal Accuracy { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Altitude_Required")]
        public decimal Speed { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Altitude_Required")]
        public decimal TimeStampMobile { get; set; }
    }
}