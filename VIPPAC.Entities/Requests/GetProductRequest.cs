namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using VIPPAC.Entities.Resources;
    public class GetProductRequest
    {
        
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Company_Required")]
        public string CompanyCode { get; set; }
        


    }
}
