namespace VIPPAC.Entities.Responses
{
    using System.Collections.Generic;

    public class PackageAvailableResponse
    {
        public string ACtivityId { get; set; }

        public List<AddressInfo> AcrivityDetails { get; set; }
    }
}