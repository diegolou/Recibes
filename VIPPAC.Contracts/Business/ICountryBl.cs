namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface ICountryBl
    {
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<CountryResponse> GetContries();

        /// <summary>
        ///
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public Response<CountryInfoResponse> GetCountry(CountryRequest code);

        /// <summary>
        ///
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public Response<StateResponse> GetState(StateRequest code);

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public Response<ParameterLocationResponse> GetParametersLocation();

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Response<CityResponse> GetActiveCities(GetActiveCitiesRequest request);

        public Response<ResultResponse> UpdateActiveCountry(HttpRequest request, CountryUpdateRequest activecountry);

        public Response<ResultResponse> UpdateActiveState(HttpRequest request, StateUpdateRequest activestate);

        public Response<ResultResponse> UpdateActiveCity(HttpRequest request, CityUpdateRequest activecity);

        public Response<ResultResponse> SendEmail(HttpRequest request, EmailRequest emailrequest);
    }
}