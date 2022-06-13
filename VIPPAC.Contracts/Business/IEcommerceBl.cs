namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface IEcommerceBl
    {
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<GetProductResponse> GetProducts();
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<GetEnterpriseProductResponse> GetEnterpriseProducts();
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<GetEnterpriseProductResponse> GetEnterprises(GetEnterprisebySecteurRequest request);
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<GetProductResponse> GetProductsbyEnterpreise(GetProductRequest request);
    }
}