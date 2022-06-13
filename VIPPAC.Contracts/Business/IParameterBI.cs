namespace VIPPAC.Contracts.Business
{
    using System.Collections.Generic;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface IParametersBI
    {
        /// <summary>
        /// Method to Get Parameters
        /// </summary>
        /// <returns></returns>
        Response<ParametersResponse> GetParameters();

        /// <summary>
        /// Method to Get Parameters By Type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Response<ParametersResponse> GetParametersByType(string type);

        /// <summary>
        /// Method to Get Parameters By Type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Response<ParametersResponse> GetAllParametersByType(string type);

        /// <summary>
        /// Method to Get Some Parameters By Type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        Response<ParametersResponse> GetSomeParametersByType(IList<string> type);

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        Response<List<string>> GetCategories();

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Response<ParametersResponse> SetParameterValue(SetParameterValueRequest request);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Response<ResponseUrlRecord> GetUrlDownloadBlob(GetUrlDownloadBlobRequest request);

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        Response<ResponseUrlRecord> GetParamC();

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        Response<TransportTypeResponse> GetTransportType();

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        Response<PackageTypeResponse> GetPackageType();

        Response<TipsResponse> GetCountryTips(string countryCode);
    }
}