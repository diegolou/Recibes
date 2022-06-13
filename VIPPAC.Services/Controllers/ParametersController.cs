// <copyright file="ParametersController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Services.Controllers
{
    using System;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// .
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ParametersController : ControllerBase
    {
        private readonly IParametersBI parameterBussines;
        private readonly ICountryBl countryBl;
        private readonly IHoliDaysBl holiDays;

        /// <summary>
        /// Initializes a new instance of the <see cref="ParametersController"/> class.
        /// </summary>
        /// <param name="countryBl">countryBl.</param>
        /// <param name="parameterBussines">parameterBussines.</param>
        /// <param name="holiDays">holiDays.</param>
        public ParametersController(ICountryBl countryBl, IParametersBI parameterBussines, IHoliDaysBl holiDays)
        {
            this.countryBl = countryBl;
            this.parameterBussines = parameterBussines;
            this.holiDays = holiDays;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetCountries")]
        [Produces(typeof(Response<CountryResponse>))]
        public IActionResult GetCountries()
        {
            return this.Ok(this.countryBl.GetContries());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="code">code.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetCountry")]
        [Produces(typeof(Response<CountryResponse>))]
        public IActionResult GetCountry([FromBody] CountryRequest code)
        {
            return this.Ok(this.countryBl.GetCountry(code));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="code">code.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetState")]
        [Produces(typeof(Response<CountryResponse>))]
        public IActionResult GetState([FromBody] StateRequest code)
        {
            return this.Ok(this.countryBl.GetState(code));
        }

        /// <summary>
        /// Operation to Get Parameters.
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetParameters")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParametersResponse>))]
        public IActionResult GetParameters()
        {
            return this.Ok(this.parameterBussines.GetParameters());
        }

        /// <summary>
        /// Operation to Get Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        /// <author>Juan Sebastián Gil Garnica.</author>
        [HttpGet]
        [Route("GetParametersByType")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParametersResponse>))]
        public IActionResult GetParametersByType(string type)
        {
            return this.Ok(this.parameterBussines.GetParametersByType(type));
        }

        /// <summary>
        /// Operation to Get All Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        /// <author>Juan Sebastián Gil Garnica.</author>
        [HttpGet]
        [Route("GetAllParametersByType")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParametersResponse>))]
        public IActionResult GetAllParametersByType(string type)
        {
            return this.Ok(this.parameterBussines.GetAllParametersByType(type));
        }

        /// <summary>
        /// Operation to Get Some Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("GetSomeParametersByType")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParametersResponse>))]
        public IActionResult GetSomeParametersByType([FromBody] IList<string> type)
        {
            return this.Ok(this.parameterBussines.GetSomeParametersByType(type));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetCategories")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<List<string>>))]
        public IActionResult GetCategories()
        {
            return this.Ok(this.parameterBussines.GetCategories());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("SetParameterValue")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParametersResponse>))]
        public IActionResult SetParameterValue([FromBody] SetParameterValueRequest request)
        {
            return this.Ok(this.parameterBussines.SetParameterValue(request));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("GetUrlDownloadBlob")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResponseUrlRecord>))]
        public IActionResult GetUrlDownloadBlob([FromBody] GetUrlDownloadBlobRequest request)
        {
            return this.Ok(this.parameterBussines.GetUrlDownloadBlob(request));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetParamC")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResponseUrlRecord>))]
        public IActionResult GetParamC()
        {
            return this.Ok(this.parameterBussines.GetParamC());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="active">Active.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetParametersLocation")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ParameterLocationResponse>))]
        public IActionResult GetParametersLocation(bool active)
        {
            return this.Ok(this.countryBl.GetParametersLocation());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetTransportType")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<TransportTypeResponse>))]
        public IActionResult GetTransportType()
        {
            return this.Ok(this.parameterBussines.GetTransportType());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetPackageType")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<TransportTypeResponse>))]
        public IActionResult GetPackageType()
        {
            return this.Ok(this.parameterBussines.GetPackageType());
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("GetActiveCities")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<CityResponse>))]
        public IActionResult GetActiveCities([FromBody] GetActiveCitiesRequest request)
        {
            return this.Ok(this.countryBl.GetActiveCities(request));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="activecountry">activecountry.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("UpdateActiveCountry")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdateCountry([FromBody] CountryUpdateRequest activecountry)
        {
            return this.Ok(this.countryBl.UpdateActiveCountry(this.Request, activecountry));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="activestate">activestate.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("UpdateActiveState")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdateActiveState([FromBody] StateUpdateRequest activestate)
        {
            return this.Ok(this.countryBl.UpdateActiveState(this.Request, activestate));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="activecity">activecity.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("UpdateActiveCity")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdateActiveCity([FromBody] CityUpdateRequest activecity)
        {
            return this.Ok(this.countryBl.UpdateActiveCity(this.Request, activecity));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="emailrequest">emailrequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SendEmail")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult SendEmail([FromBody] EmailRequest emailrequest)
        {
            return this.Ok(this.countryBl.SendEmail(this.Request, emailrequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="countryCode">countryCode.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [EnableCors("CorsPolicy")]
        [Route("GetCountryTips")]
        [Produces(typeof(TipsResponse))]
        public IActionResult GetCountryTips(string countryCode)
        {
            return this.Ok(this.parameterBussines.GetCountryTips(countryCode));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="date">date.</param>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [EnableCors("CorsPolicy")]
        [Route("IstHoliday")]
        [Produces(typeof(Response<IsHolidayResponse>))]
        public IActionResult IsHoliday(DateTime date, string country)
        {
            return this.Ok(this.holiDays.IsHoliday(date, country));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [EnableCors("CorsPolicy")]
        [Route("GetHolidays")]
        [Produces(typeof(Response<HoliDaysResponse>))]
        public IActionResult GetHolidays(string country)
        {
            return this.Ok(this.holiDays.GetHoliDays(country));
        }
    }
}