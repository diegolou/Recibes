namespace VIPPAC.Entities.Requests
{
    using System.Collections.Generic;

    public class AdminCustomerPrivatePlansRequest
    {
        /// <summary>
        ///
        /// </summary>
        public string PlanId { get; set; }

        /// <summary>
        ///
        /// </summary>
        public List<CustomerIdRequest> CustomerList { get; set; }
    }
}