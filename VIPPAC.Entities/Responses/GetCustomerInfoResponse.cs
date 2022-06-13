namespace VIPPAC.Entities.Responses
{
    using System.Collections.Generic;
    using VIPPAC.Entities;

    public class GetCustomerInfoResponse
    {
        public string IdType { get; set; }

        public long IdNumber { get; set; }

        public string Profile { get; set; }

        public string CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Status { get; set; }

        public long Mobile { get; set; }

        public bool Retefuente { get; set; }

        public string ActaReteFuente { get; set; }

        public bool ReteIca { get; set; }

        public string ActaReteIca { get; set; }

        public bool Company { get; set; }

        public int CountryCode { get; set; }

        public List<AddressInfo> AddressInfoList { get; set; }
    }
}