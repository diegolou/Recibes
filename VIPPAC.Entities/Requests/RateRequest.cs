namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class RateRequest
    {
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public string City { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public string TransportType { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public bool Active { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double DistanceLimit { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Distance_sec { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Distancia_ini { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public string Image { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Recargo_fest { get; set; }

        /// <summary>
        ///
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Recargo_noc { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Tarifa_ini { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Tarifa_mts { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Value_Required")]
        public double Tarife_sec { get; set; }
    }
}