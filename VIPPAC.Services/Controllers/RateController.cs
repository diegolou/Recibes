// <copyright file="RateController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace VIPPAC.Services.Controllers
{
    using System;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// .
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class RateController : ControllerBase
    {
        private readonly IRateBl rateBussiness;
        private readonly IHoliDaysBl holiDays;

        /// <summary>
        /// Initializes a new instance of the <see cref="RateController"/> class.
        /// </summary>
        /// <param name="rateBusiness">rateBusiness.</param>
        /// <param name="holidays">holidays.</param>
        public RateController(IRateBl rateBusiness, IHoliDaysBl holidays)
        {
            this.rateBussiness = rateBusiness;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="customerRequest">customerRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetRate")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult RegistryCustomer([FromBody] GetRateRequest customerRequest)
        {
            return this.Ok(this.rateBussiness.GetRate(this.Request, customerRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="ttc">ttc.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SetTransportTypeCharacteristic")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult SetTransportTypeCharacteristic([FromBody] SetTransportTypeCharateristic ttc)
        {
            return this.Ok(this.rateBussiness.SetTransportTypeCharacteristic(this.Request, ttc));
        }

        /// <summary>
        /// Update Rate by City in "Recibes".
        /// </summary>
        /// <param name="ratereuqest">ratereuqest.</param>
        /// <returns>returns.</returns>
        [HttpPut]
        [Route("UpdateRate")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdateCityRate([FromBody] RateRequest ratereuqest)
        {
            return this.Ok(this.rateBussiness.UpdateCityRate(this.Request, ratereuqest));
        }

        /// <summary>
        /// Update Rate by City in "Recibes".
        /// </summary>
        /// <param name="pricerequest">pricerequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("PriceTransport")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<RateValue>))]
        public IActionResult PriceTransport([FromBody] PriceRequest pricerequest)
        {
            return this.Ok(this.rateBussiness.PriceTransport(this.Request, pricerequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="inforequest">inforequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetRateCitiesActive")]
        [Produces(typeof(Response<GetRateCitiesActiveResponse>))]
        public IActionResult GetRateCitiesActive([FromBody] CountryRequest inforequest)
        {
            return this.Ok(this.rateBussiness.GetRateCitiesActive(this.Request, inforequest));
        }

        /// <summary>
        /// GetHoliday.
        /// </summary>
        /// <param name="date">date.</param>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetHoliday")]
        [Produces(typeof(Response<HoliDaysResponse>))]
        public IActionResult GetHoliday(DateTime date, string country)
        {
            return this.Ok(this.holiDays.GetHoliDays(country));
        }
    }
}