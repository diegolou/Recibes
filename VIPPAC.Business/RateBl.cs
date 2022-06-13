// <copyright file="RateBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Http;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Table;
    using VIPPAC.Business.Referentials;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;
    using VIPPAC.Entities.Tables;
    using VIPPAC.Utils;
    using VIPPAC.Utils.Enum;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// RateBl.
    /// </summary>
    public class RateBl : BusinessBase<RegPackage>, IRateBl
    {
        private readonly IGenericRep<City> cityReg;
        private readonly IGenericRep<PackageType> packageType;
        private readonly IGenericRep<PackbyTOT> packbyTOT;
        private readonly IGenericRep<PricebyCitybyTOT> pbcbt;
        private readonly IGenericRep<TransportType> transporType;
        private readonly IGenericRep<TransportTypeCharacteristics> ttc;

        /// <summary>
        /// Initializes a new instance of the <see cref="RateBl"/> class.
        /// </summary>
        /// <param name="trasnporType">trasnporType.</param>
        /// <param name="logRep">logRep.</param>
        /// <param name="packageType">packageType.</param>
        /// <param name="packbyTOT">packbyTOT.</param>
        /// <param name="trasnporTypeCharacteristics">trasnporTypeCharacteristics.</param>
        /// <param name="pricebycitybytot">pricebycitybytot.</param>
        /// <param name="cityReg">cityReg.</param>
        public RateBl(
            IGenericRep<TransportType> trasnporType,
            IGenericRep<Log> logRep,
            IGenericRep<PackageType> packageType,
            IGenericRep<PackbyTOT> packbyTOT,
            IGenericRep<TransportTypeCharacteristics> trasnporTypeCharacteristics,
            IGenericRep<PricebyCitybyTOT> pricebycitybytot,
            IGenericRep<City> cityReg)
        {
            this.transporType = trasnporType;
            this.ttc = trasnporTypeCharacteristics;
            this.logRep = logRep;
            this.pbcbt = pricebycitybytot;
            this.cityReg = cityReg;
            this.packageType = packageType;
            this.packbyTOT = packbyTOT;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="package">package.</param>
        /// <returns>return.</returns>
        public Response<GetRateResponse> GetRate(HttpRequest request, GetRateRequest package)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (package == null)
            {
                this.RegistryLog("App", "Get Rate Info", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = package.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Rate Info", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GetRateResponse>(errorsMessage);
            }

            var result = this.pbcbt.GetByPartitionKeyAndRowKeyAsync(package.PartitionKey, package.RowKey, FilterType.None).Result;

            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<GetRateResponse>(ServiceResponseCode.ParameterNotFound);
            }

            GetRateResponse rateResult = new GetRateResponse
            {
                Active = result[0].Active,
                DistanceLimit = result[0].DistanceLimit,
                Distance_sec = result[0].Distance_sec,
                Distancia_ini = result[0].Distancia_ini,
                Image = result[0].Image,
                Recargo_fest = result[0].Recargo_fest,
                Recargo_noc = result[0].Recargo_noc,
                Tarifa_ini = result[0].Tarifa_ini,
                Tarifa_mts = result[0].Tarifa_mts,
                Tarife_sec = result[0].Tarifa_mts,
            };

            return ResponseSuccess<GetRateResponse>(new List<GetRateResponse>() { rateResult });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="infoRequest">infoRequest.</param>
        /// <returns>return.</returns>
        public Response<GetRateCitiesActiveResponse> GetRateCitiesActive(HttpRequest request, CountryRequest infoRequest)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (infoRequest == null)
            {
                this.RegistryLog("App", "Get Rate Cities Active Info", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = infoRequest.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Rate Cities Active Info", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GetRateCitiesActiveResponse>(errorsMessage);
            }

            var queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "Active",
                    Condition = QueryComparisons.Equal,
                    ValueBool = true,
                },
            };

            // Se buscan las ciudades activas
            var resultCity = this.cityReg.GetListQueryAsync(queryt).Result;
            if (resultCity == null || resultCity.Count == 0)
            {
                return this.ResponseFail<GetRateCitiesActiveResponse>(ServiceResponseCode.ParameterNotFound);
            }

            var resultRate = this.pbcbt.GetListAsync().Result;

            var responseQuery = new List<GetRateCitiesActiveResponse>();
            resultCity.ForEach(r =>
            {
                if (r.PartitionKey.IndexOf(infoRequest.Code) == 0)
                {
                    var cityCode = $"{r.RowKey}-{r.PartitionKey}";
                    var autRate = resultRate.Where(x => x.CityCode == cityCode).ToList();
                    autRate.ForEach(x =>
                    {
                        responseQuery.Add(new GetRateCitiesActiveResponse
                        {
                            Active = x.Active,
                            CityCode = x.CityCode,
                            PackageCode = x.TOTCode,
                            DistanceLimit = x.DistanceLimit,
                            Distance_sec = x.Distance_sec,
                            Distancia_ini = x.Distancia_ini,
                            Recargo_fest = x.Recargo_fest,
                            Recargo_noc = x.Recargo_noc,
                            Tarifa_ini = x.Tarifa_ini,
                            Tarifa_mts = x.Tarifa_mts,
                            Tarife_sec = x.Tarifa_sec,
                        });
                    });
                }
            });

            return ResponseSuccess<GetRateCitiesActiveResponse>(responseQuery);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="pricerequest">pricerequest.</param>
        /// <returns>return.</returns>
        public Response<RateValue> PriceTransport(HttpRequest request, PriceRequest pricerequest)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (pricerequest == null)
            {
                this.RegistryLog("App", "Price transport", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("stateReg");
            }

            var errorsMessage = pricerequest.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update City Rate", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<RateValue>(errorsMessage);
            }

            var resultpt = this.packageType.GetAllAsync().Result;
            if (resultpt == null || resultpt.Count == 0)
            {
                return this.ResponseFail<RateValue>(ServiceResponseCode.NotFound);
            }

            var resultpbtAll = this.packbyTOT.GetAllAsync().Result;
            var resultotAll = this.transporType.GetAllAsync().Result;
            var resultAll = this.pbcbt.GetAllAsync().Result;
            var ratevalue = new List<RateValue>();

            resultpt.ForEach(r =>
            {
                var addValid = false;
                var ratev = new RateValue
                {
                    Tp_code = r.PartitionKey,
                    Tp_name = r.RowKey,
                    Image = r.Image,
                    WeightLimit = r.WeightLimit,
                    SizeLimit = r.SizeLimit,
                    RateValueByCity = new List<RateValueByCity>(),
                };

                var resultpbt = resultpbtAll.Where(x => x.PartitionKey == ratev.Tp_name).ToList();
                if (resultpbt.Count > 0)
                {
                    resultpbt.ForEach(z =>
                    {
                        var ratevaluebycity = new RateValueByCity();
                        var resultot = resultotAll.Where(x => x.RowKey == z.RowKey).ToList();
                        if (resultot.Count == 1)
                        {
                            var result = resultAll.Where(x => x.Active == true && x.PartitionKey == pricerequest.city && x.RowKey == resultot[0].PartitionKey).ToList();
                            if (result.Count == 1)
                            {
                                addValid = true;
                                ratevaluebycity.Tot_Code = result[0].RowKey;
                                ratevaluebycity.Tot_Name = resultot[0].RowKey;
                                ratevaluebycity.Tp_Priority = z.Priority;
                                ratevaluebycity.ValueDist = result[0].Tarifa_ini;
                                ratevaluebycity.ValueDistExtra = result[0].Tarifa_mts;
                                ratevaluebycity.ValuexTraStop = result[0].Tarifa_sec;
                                ratevaluebycity.ValueReturn = result[0].Tarifa_sec;
                                ratevaluebycity.NightValue = result[0].Recargo_noc;
                                ratevaluebycity.HolidayValue = result[0].Recargo_fest;
                                ratevaluebycity.DistanceIni = result[0].Distancia_ini;
                            }

                            ratev.RateValueByCity.Add(ratevaluebycity);
                        }
                    });
                }

                if (addValid)
                {
                    ratevalue.Add(ratev);
                }
            });

            return ResponseSuccess<RateValue>((IList<RateValue>)ratevalue);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="ttc">ttc.</param>
        /// <returns>return.</returns>
        public Response<ResultResponse> SetTransportTypeCharacteristic(HttpRequest request, SetTransportTypeCharateristic ttc)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (ttc == null)
            {
                this.RegistryLog("App", "Set New type transport characteristic", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = ttc.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Set New type transport characteristic", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            this.AddTTC(ttc, out TransportTypeCharacteristics cTtc, out bool result, out string error);
            if (!result)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "There is already a TTC with the same Id. System error:" + error, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            string message = string.Format("The Type of transport Charasterictic {0} created Correctly", cTtc.CodeTTC, cTtc.IdTTC);
            this.RegistryLog("App", "Registry TTC", Utils.Enum.StateLog.Ok, message, ttc, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.UserCreatedOk) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="ratereuqest">ratereuqest.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> UpdateCityRate(HttpRequest request, RateRequest ratereuqest)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (ratereuqest == null)
            {
                this.RegistryLog("App", "Update City Rate", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("stateReg");
            }

            var errorsMessage = ratereuqest.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update City Rate", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var result = this.pbcbt.AddOrUpdate(new PricebyCitybyTOT
            {
                RowKey = ratereuqest.City,
                PartitionKey = ratereuqest.TransportType,
                Active = ratereuqest.Active,
                DistanceLimit = ratereuqest.DistanceLimit,
                Distance_sec = ratereuqest.Distance_sec,
                Distancia_ini = ratereuqest.Distancia_ini,
                Image = ratereuqest.Image,
                Recargo_fest = ratereuqest.Recargo_fest,
                Recargo_noc = ratereuqest.Recargo_noc,
                Tarifa_ini = ratereuqest.Tarifa_ini,
                Tarifa_mts = ratereuqest.Tarifa_mts,
                Tarifa_sec = ratereuqest.Tarife_sec,
            }).Result;

            if (!result)
            {
                this.RegistryLog("App", "Update Rate", Utils.Enum.StateLog.Error, "There is already a Rate with the same Id. System error:", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            string message = string.Format("The Rate for {0} and {1} updated Correctly", ratereuqest.City, ratereuqest.TransportType);
            this.RegistryLog("App", "Registry TTC", Utils.Enum.StateLog.Ok, message, ratereuqest, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.StateUpdateOK) } });
        }

        private void AddTTC(SetTransportTypeCharateristic ttc, out TransportTypeCharacteristics cTtc, out bool result, out string error)
        {
            error = string.Empty;
            try
            {
                var number = (this.ttc.GetAllAsync().Result.Count + 100).ToString();

                cTtc = new TransportTypeCharacteristics()
                {
                    PartitionKey = number,
                    RowKey = ttc.CodeTTC,
                    DescriptionTTC = ttc.DescriptionTTC,
                    WeightLimit = ttc.WeightLimit,
                    SizeLimit = ttc.SizeLimit,
                };
                result = this.ttc.Add(cTtc).Result;
            }
            catch (StorageException ex)
            {
                cTtc = null;
                error = ex.Message;
                result = false;
            }
            catch (Exception ex)
            {
                cTtc = null;
                error = ex.Message;
                result = false;
            }
        }
    }
}