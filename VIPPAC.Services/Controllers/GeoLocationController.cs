// <copyright file="GeoLocationController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Services.Controllers
{
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
    public class GeoLocationController : ControllerBase
    {
        private readonly IPackerGeolocationBl packerGeoBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="GeoLocationController"/> class.
        /// </summary>
        /// <param name="packerGeoBusiness">packerGeoBusiness.</param>
        public GeoLocationController(IPackerGeolocationBl packerGeoBusiness)
        {
            this.packerGeoBusiness = packerGeoBusiness;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="packerGeoRequest">packerGeoRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SetPackerGeoLocation")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult SetPackerGeoLocation([FromBody] PackerGeolocationRequest packerGeoRequest)
        {
            return this.Ok(this.packerGeoBusiness.SetPackerGeoLocation(this.Request, packerGeoRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="packerGeoRequest">packerGeoRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetPackerGeoLocationCustomer")]
        [Produces(typeof(Response<GeoLocationResultResponse>))]
        public IActionResult GetPackerGeoLocationCustomer([FromBody] GetPositionPackerCustomerRequest packerGeoRequest)
        {
            return this.Ok(this.packerGeoBusiness.GetPackerGeoLocationCustomer(this.Request, packerGeoRequest));
        }
    }
}