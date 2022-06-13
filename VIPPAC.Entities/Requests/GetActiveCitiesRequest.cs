namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;

    public class GetActiveCitiesRequest
    {
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Country_Required")]
        public string Code { get; set; }
    }
}