// <copyright file="PackagesController.cs" company="PlaceholderCompany">
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
    public class PackagesController : ControllerBase
    {
        private readonly IPackageBl packageBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="PackagesController"/> class.
        /// </summary>
        /// <param name="packageBusiness">packageBusiness.</param>
        public PackagesController(IPackageBl packageBusiness)
        {
            this.packageBusiness = packageBusiness;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="packerGeoRequest">packerGeoRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SendPackage")]
        [Produces(typeof(Response<SendPackageResponse>))]
        public IActionResult SendPackage([FromBody] SendPackageRespuest packerGeoRequest)
        {
            return this.Ok(this.packageBusiness.SendPackage(this.Request, packerGeoRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="packerStatusRequest">packerStatusRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetCustomerPackageStatus")]
        [Produces(typeof(Response<PackageStatusResponse>))]
        public IActionResult GetCustomerPackageStatus([FromBody] CustomerPackageStatusRequest packerStatusRequest)
        {
            return this.Ok(this.packageBusiness.GetCustomerPackageStatus(this.Request, packerStatusRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetPackageAvailable")]
        [Produces(typeof(Response<PackageAvailableResponse>))]
        public IActionResult GetPackageAvailable()
        {
            return this.Ok(this.packageBusiness.GetPackageAvailable(this.Request));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="package">package.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SetAssignPackage")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult SetAssignPackage([FromBody] AssignPackageRequest package)
        {
            return this.Ok(this.packageBusiness.SetAssignPackage(this.Request, package));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="activity">activity.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetActivityDetail")]
        [Produces(typeof(Response<GetActivityDetailResponse>))]
        public IActionResult GetActivityDetail([FromBody] GetActivityDetailRequest activity)
        {
            return this.Ok(this.packageBusiness.GetActivityDetail(this.Request, activity));
        }
    }
}