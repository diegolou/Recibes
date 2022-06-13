namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class SetTransportTypeCharateristic
    {
        //[Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "IdTypeTransportCharasteristic_Required")]
        //public string IdTTC { get; set; }

        /// <summary>
        /// Gets or sets for ParameterId.
        /// </summary>
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "CodeTypeTransportCharasterisctic__Required")]
        public string CodeTTC { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "DescriptionTypeTransportCharasterictic__Required")]
        public string DescriptionTTC { get; set; }

        public double WeightLimit { get; set; }
        public string SizeLimit { get; set; }
    }
}