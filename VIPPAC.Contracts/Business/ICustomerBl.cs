namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface ICustomerBl
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Response<ResultResponse> RegistryCustomer(HttpRequest request, RegistryCustomerRequest user);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customer"></param>
        /// <returns></returns>
        Response<GetCustomerInfoResponse> GetCustomerInfo(HttpRequest request, CustomerRequest customer);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customer"></param>
        /// <returns></returns>
        Response<ResultResponse> UpdateCustomer(HttpRequest request, UpdateCustomerRequest customer);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="customer"></param>
        /// <returns></returns>
        Response<CustomerPlansResponse> GetCustomerPlan(HttpRequest request, CustomerRequest customer);
    }
}