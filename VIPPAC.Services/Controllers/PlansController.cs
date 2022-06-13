// <copyright file="PlansController.cs" company="PlaceholderCompany">
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
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly IPlansBl plansBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="PlansController"/> class.
        /// </summary>
        /// <param name="plans">plans.</param>
        public PlansController(IPlansBl plans)
        {
            this.plansBusiness = plans;
        }

        /// <summary>
        /// Get public plan list.
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetPlans")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<PlansResponse>))]
        public IActionResult GetPlans()
        {
            return this.Ok(this.plansBusiness.GetPlans());
        }

        /// <summary>
        /// Get public plan list.
        /// </summary>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetPlansActive")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<PlansResponse>))]
        public IActionResult GetPlansActive()
        {
            return this.Ok(this.plansBusiness.GetPlansActive());
        }

        /// <summary>
        /// Get all plan list.
        /// </summary>
        /// <returns>returnd.</returns>
        [HttpGet]
        [Route("GetPlansAdmin")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<PlansResponse>))]
        public IActionResult GetPlansAdmin()
        {
            return this.Ok(this.plansBusiness.GetPlansAdmin());
        }

        /// <summary>
        /// Get plan lists for a country.
        /// </summary>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [Route("GetPlansbyCountries")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<PlansResponse>))]
        public IActionResult GetPlansbyCountries(string country)
        {
            return this.Ok(this.plansBusiness.GetPlansbyCountries(country));
        }

        /// <summary>
        /// Create new plans in "Recibes".
        /// </summary>
        /// <param name="plans">plans.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [Route("SetNewPlan")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult GetNewPlan([FromBody] SetPlansRequest plans)
        {
            return this.Ok(this.plansBusiness.SetPlans(this.Request, plans));
        }

        /// <summary>
        /// Update Plans in "Recibes".
        /// </summary>
        /// <param name="plans">plans.</param>
        /// <returns>returns.</returns>
        [HttpPut]
        [Route("UpdatePlan")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdatePlan([FromBody] PlansRequest plans)
        {
            return this.Ok(this.plansBusiness.UpdatePlans(this.Request, plans));
        }

        /// <summary>
        /// Remove a specific plan.
        /// </summary>
        /// <param name="idCountry">Country code.</param>
        /// <param name="idPlans">Plan code.</param>
        /// <returns>returns.</returns>
        [HttpDelete]
        [Route("DeletePlan")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult DeletePlan(string idCountry, string idPlans)
        {
            return this.Ok(this.plansBusiness.DeletePlans(this.Request, idCountry, idPlans));
        }

        /// <summary>
        /// Delete customer from a private plan.
        /// </summary>
        /// <param name="cp">cp.</param>
        /// <returns>returns.</returns>
        [HttpDelete]
        [Route("DeleteCustomerPrivatePlan")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult DeleteCustomerPrivatePlan([FromBody] AdminCustomerPrivatePlansRequest cp)
        {
            return this.Ok(this.plansBusiness.DeleteCustomersPrivstePlans(this.Request, cp));
        }

        /// <summary>
        ///  Add or modify customer from a private plan.
        /// </summary>
        /// <param name="cp">cp.</param>
        /// <returns>returns.</returns>
        [HttpPut]
        [Route("AdminCustomersPrivstePlans")]
        [EnableCors("CorsPolicy")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult AdminCustomersPrivstePlans([FromBody] AdminCustomerPrivatePlansRequest cp)
        {
            return this.Ok(this.plansBusiness.AdminCustomersPrivstePlans(this.Request, cp));
        }
    }
}