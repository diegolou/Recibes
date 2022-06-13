namespace VIPPAC.Entities.Requests
{
    using System.ComponentModel.DataAnnotations;
    using Entities.Resources;

    public class GetRateRequest
    {
        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Name_Required")]
        public string PartitionKey { get; set; }

        [Required(ErrorMessageResourceType = typeof(EntityMessages), ErrorMessageResourceName = "Name_Required")]
        public string RowKey { get; set; }
    }
}