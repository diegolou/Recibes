// <copyright file="CountryBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Mail;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
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
    /// CountryBl.
    /// </summary>
    public class CountryBl : BusinessBase<CountryResponse>, ICountryBl
    {
        private readonly IGenericRep<City> cityReg;
        private readonly IGenericRep<Country> countryRep;

        private readonly IGenericRep<CustomerActivation> cusAct;
        private readonly IGenericRep<EmailType> emailtype;
        private readonly IGenericRep<PricebyCitybyTOT> pricebycity;
        private readonly IGenericRep<State> stateReg;

        // private readonly UserSecretSettings _settings;
        private readonly IGenericRep<TransportType> transType;

        /// <summary>
        /// Initializes a new instance of the <see cref="CountryBl"/> class.
        /// </summary>
        /// <param name="countryReg">countryReg.</param>
        /// <param name="stateReg">stateReg.</param>
        /// <param name="cityReg">cityReg.</param>
        /// <param name="logReg">logReg.</param>
        /// <param name="transType">transType.</param>
        /// <param name="pricebycity">pricebycity.</param>
        /// <param name="emailtype">emailtype.</param>
        /// <param name="cusAct">cusAct.</param>
        public CountryBl(
            IGenericRep<Country> countryReg,
            IGenericRep<State> stateReg,
            IGenericRep<City> cityReg,
            IGenericRep<Log> logReg,
            IGenericRep<TransportType> transType,
            IGenericRep<PricebyCitybyTOT> pricebycity,
            IGenericRep<EmailType> emailtype,
            IGenericRep<CustomerActivation> cusAct)
        {
            this.countryRep = countryReg;
            this.stateReg = stateReg;
            this.cityReg = cityReg;
            this.logRep = logReg;

            // this._settings = options?.Value;
            this.transType = transType;
            this.pricebycity = pricebycity;
            this.emailtype = emailtype;
            this.cusAct = cusAct;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        public Response<CityResponse> GetActiveCities(GetActiveCitiesRequest request)
        {
            var queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "Active",
                    Condition = QueryComparisons.Equal,
                    ValueBool = true,
                },
            };

            var rateCities = this.pricebycity.GetAllAsync().Result;

            // Se buscan las ciudades activas
            var result = this.cityReg.GetListQueryAsync(queryt).Result;
            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<CityResponse>(ServiceResponseCode.ParameterNotFound);
            }

            var citiesList = new List<CityResponse>();

            result.ForEach(r =>
            {
                if (r.PartitionKey.IndexOf(request.Code) == 0)
                {
                    if (rateCities.Where(x => x.CityCode == $"{r.RowKey}-{r.PartitionKey}").Count() > 0)
                    {
                        citiesList.Add(new CityResponse() { LgCode = $"{r.RowKey}-{r.PartitionKey}", Code = r.Code, Name = r.Name, GoogleMapCP = r.GoogleMapCP, CodeGuid = r.CodeGuid });
                    }
                }
            });
            return ResponseSuccess<CityResponse>(citiesList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<CountryResponse> GetContries()
        {
            var result = this.countryRep.GetListAsync().Result;

            if (result == null || result.Count == 0)
            {
                return ResponseFail<CountryResponse>();
            }

            var countryResult = new List<CountryResponse>();

            result.ForEach(r => countryResult.Add(new CountryResponse { Code = r.Code, Name = r.Name, CCode = r.CCode, IsActivated = r.IsActivated, ShortCode = r.ShortCode, Lat = r.Lat, Lng = r.Lng }));
            return ResponseSuccess(countryResult);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="code">code.</param>
        /// <returns>returns.</returns>
        public Response<CountryInfoResponse> GetCountry(CountryRequest code)
        {
            var result = this.countryRep.GetByPatitionKeyAsync(code.Code).Result;

            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<CountryInfoResponse>(ServiceResponseCode.ParameterNotFound);
            }

            CountryInfoResponse countryResult = new CountryInfoResponse
            {
                Code = result[0].Code,
                CCode = result[0].CCode,
                Name = result[0].Name,
            };

            // Se consigue la información de los departamntos.
            var resultState = this.stateReg.GetByPatitionKeyAsync(countryResult.Code).Result;

            // if (ResultState == null || ResultState.Count == 0)
            // {
            //    return ResponseFail<CountryInfoResponse>(ServiceResponseCode.ParameterNotFound);
            // }
            countryResult.States = new List<ValueResponse>();

            // ResultState.ForEach(r => CountryResult.States.Add(new ValueResponse { Code = r.Code, Name = r.Name }));
            resultState.Where(r => r.Active).ToList().ForEach(r => countryResult.States.Add(new ValueResponse { Code = r.Code, Name = r.Name }));
            return ResponseSuccess<CountryInfoResponse>(new List<CountryInfoResponse>() { countryResult });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>Returns.</returns>
        public Response<ParameterLocationResponse> GetParametersLocation()
        {
            // Captura la información del los paises
            var rCountries = this.countryRep.GetListAsync().Result;

            // Captura los estados
            var rStates = this.stateReg.GetListAsync();

            // Captura Ciudades
            var rCities = this.cityReg.GetListAsync();

            var result = new ParameterLocationResponse() { Cities = rCities.Result, States = rStates.Result, Countries = rCountries };

            return ResponseSuccess<ParameterLocationResponse>(new List<ParameterLocationResponse>() { result });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="code">code.</param>
        /// <returns>returns.</returns>
        public Response<StateResponse> GetState(StateRequest code)
        {
            var result = this.stateReg.GetByPartitionKeyAndRowKeyAsync(code.CountryCode, code.StateCode, FilterType.None).Result;

            if (result == null)
            {
                return ResponseFail<StateResponse>();
            }

            StateResponse countryResult = new StateResponse
            {
                Country = result[0].Country,
                Code = result[0].Code,
                Name = result[0].Name,
            };

            // Se consigue la información de los departamntos.
            var resultCity = this.cityReg.GetByPatitionKeyAsync(string.Format("{0}-{1}", code.CountryCode, code.StateCode)).Result;

            // if (ResultCity == null || ResultCity.Count == 0)
            // {
            //    return ResponseFail<StateResponse>(ServiceResponseCode.ParameterNotFound);
            // }
            countryResult.Cities = new List<ValueResponse>();

            resultCity.Where(r => r.Active).ToList().ForEach(r => countryResult.Cities.Add(new ValueResponse { Code = r.Code, Name = r.Name }));

            return ResponseSuccess<StateResponse>(new List<StateResponse>() { countryResult });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="emailrequest">emailrequest.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> SendEmail(HttpRequest request, EmailRequest emailrequest)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (emailrequest == null)
            {
                this.RegistryLog("App", "SendEmail", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("SendEmailReg");
            }

            var errorsMessage = emailrequest.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "SendEmail", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            try
            {
                var builder = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json");
                var config = builder.Build();

                var smtpClient = new SmtpClient(config["Smtp:Host"])
                {
                    Port = int.Parse(config["Smtp:Port"]),
                    Credentials = new NetworkCredential(config["Smtp:Username"], config["Smtp:Password"]),
                    EnableSsl = true,
                };
                var subject = string.Empty;
                var body = string.Empty;
                var error = string.Empty;

                switch (emailrequest.tipo)
                {
                    case "Aunteticacion":
                        this.AutenticationEmail(emailrequest.emaildestino, out subject, out body, out error);
                        break;

                    default:
                        break;
                }

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(config["Smtp:Username"]),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(emailrequest.emaildestino);

                smtpClient.Send(mailMessage);

                smtpClient.Dispose();
                this.RegistryLog("App", "SendEmail", Utils.Enum.StateLog.Ok, string.Empty, string.Empty, startTime, DateTime.UtcNow);
                return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.StateUpdateOK) } });
            }
            catch (Exception ex)
            {
                this.RegistryLog("App", "SendEmial", Utils.Enum.StateLog.Error, "Email Not Send:", ex.Message, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ErrorSendMail);
            }
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="activecity">activecity.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> UpdateActiveCity(HttpRequest request, CityUpdateRequest activecity)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (activecity == null)
            {
                this.RegistryLog("App", "Update state", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("stateReg");
            }

            var errorsMessage = activecity.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update City", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var result = this.cityReg.GetByPartitionKeyAndRowKeyAsync(activecity.StateCode, activecity.CityCode, FilterType.None).Result;

            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ParameterNotFound);
            }

            result[0].Active = activecity.IsActivated;

            bool update = this.cityReg.AddOrUpdate(result[0]).Result;

            if (!update)
            {
                this.RegistryLog("App", "Update City", Utils.Enum.StateLog.Error, "There is already a city with the same Id. System error:", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            if (activecity.IsActivated)
            {
                this.AddRateToCity(activecity);
            }

            string message = string.Format("The state {0} {1} updated Correctly", activecity.StateCode, activecity.CityCode);
            this.RegistryLog("App", "Update City", Utils.Enum.StateLog.Ok, message, result[0], startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.StateUpdateOK) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="activecountry">activecountry.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> UpdateActiveCountry(HttpRequest request, CountryUpdateRequest activecountry)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (activecountry == null)
            {
                this.RegistryLog("App", "Update Country", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("countryReg");
            }

            var errorsMessage = activecountry.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update Country", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var result = this.countryRep.GetByPatitionKeyAsync(activecountry.Code.ToUpper()).Result;

            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ParameterNotFound);
            }

            result[0].Code.ToUpper();
            result[0].IsActivated = activecountry.IsActivated;

            bool update = this.countryRep.AddOrUpdate(result[0]).Result;

            if (!update)
            {
                this.RegistryLog("App", "Update country", Utils.Enum.StateLog.Error, "There is already a Country with the same Id. System error:", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            string message = string.Format("The Country {0} updated Correctly", activecountry.Code);
            this.RegistryLog("App", "Update Country", Utils.Enum.StateLog.Ok, message, result[0], startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.CountryUpdateOK) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="activestate">activestate.</param>
        /// <returns>retuerns.</returns>
        public Response<ResultResponse> UpdateActiveState(HttpRequest request, StateUpdateRequest activestate)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (activestate == null)
            {
                this.RegistryLog("App", "Update state", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("stateReg");
            }

            var errorsMessage = activestate.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update state", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var result = this.stateReg.GetByPartitionKeyAndRowKeyAsync(activestate.CountryCode, activestate.SateCode, FilterType.None).Result;

            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ParameterNotFound);
            }

            result[0].Active = activestate.IsActivated;

            bool update = this.stateReg.AddOrUpdate(result[0]).Result;

            if (!update)
            {
                this.RegistryLog("App", "Update state", Utils.Enum.StateLog.Error, "There is already a state with the same Id. System error:", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            string message = string.Format("The state {0} updated Correctly", activestate.SateCode);
            this.RegistryLog("App", "Update State", Utils.Enum.StateLog.Ok, message, result[0], startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.StateUpdateOK) } });
        }

        private void AddRateToCity(CityUpdateRequest city)
        {
            try
            {
                var rtt = this.transType.GetListAsync().Result;
                if (rtt.Count > 0)
                {
                    rtt.ForEach(r =>
                    {
                        var cPtot = new PricebyCitybyTOT
                        {
                            PartitionKey = city.CityCode + '-' + city.StateCode,
                            RowKey = r.PartitionKey,
                            DistanceLimit = 0,
                            Distance_sec = 0,
                            Distancia_ini = 0,
                            Recargo_fest = 0,
                            Image = string.Empty,
                            Recargo_noc = 0,
                            Tarifa_ini = 0,
                            Tarifa_mts = 0,
                            Tarifa_sec = 0,
                            Active = true,
                        };

                        var resp = this.pricebycity.GetByPartitionKeyAndRowKeyAsync(cPtot.CityCode, cPtot.TOTCode, FilterType.None).Result;
                        if (resp.Count > 0)
                        {
                            cPtot.DistanceLimit = resp[0].DistanceLimit;
                            cPtot.Distance_sec = resp[0].Distance_sec;
                            cPtot.Distancia_ini = resp[0].Distancia_ini;
                            cPtot.Recargo_fest = resp[0].Recargo_fest;
                            cPtot.Image = resp[0].Image;
                            cPtot.Recargo_noc = resp[0].Recargo_noc;
                            cPtot.Tarifa_ini = resp[0].Tarifa_ini;
                            cPtot.Tarifa_mts = resp[0].Tarifa_mts;
                            cPtot.Tarifa_sec = resp[0].Tarifa_sec;
                            cPtot.Active = resp[0].Active;
                        }

                        bool update = this.pricebycity.AddOrUpdate(cPtot).Result;
                    });
                }
            }
            catch (Exception)
            {
            }
        }

        private void AutenticationEmail(string emaildestino, out string subject, out string body, out string error)
        {
            error = string.Empty;
            try
            {
                var result = this.emailtype.GetByPartitionKeyAndRowKeyAsync("1", "Aunteticacion", FilterType.None).Result;
                if (result == null || result.Count == 0)
                {
                    error = "No hay subject en Email.";
                }

                subject = result[0].Subject;
                body = result[0].bodyheat;
                var autcode = this.cusAct.GetByPatitionKeyAsync("customer-" + emaildestino).Result;
                if (autcode.Count > 0 && autcode != null)
                {
                    body += autcode[^1].RowKey;
                }

                body = body + result[0].bodyfoot + result[0].sign; // "<h1>Hello</h1>";
            }
            catch (Exception ex)
            {
                error = ex.Message;
                subject = null;
                body = null;
            }
        }
    }
}