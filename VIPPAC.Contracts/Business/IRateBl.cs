namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface IRateBl
    {
        Response<GetRateResponse> GetRate(HttpRequest request, GetRateRequest package);

        Response<ResultResponse> SetTransportTypeCharacteristic(HttpRequest request, SetTransportTypeCharateristic ttc);

        Response<ResultResponse> UpdateCityRate(HttpRequest request, RateRequest ratereuqest);

        Response<RateValue> PriceTransport(HttpRequest request, PriceRequest pricerequest);

        public Response<GetRateCitiesActiveResponse> GetRateCitiesActive(HttpRequest request, CountryRequest infoRequest);
    }
}