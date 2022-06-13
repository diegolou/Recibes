namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface IPackerGeolocationBl
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="packer"></param>
        /// <returns></returns>
        public Response<ResultResponse> SetPackerGeoLocation(HttpRequest request, PackerGeolocationRequest packer);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public Response<GeoLocationResultResponse> GetPackerGeoLocationCustomer(HttpRequest request, GetPositionPackerCustomerRequest query);
    }
}