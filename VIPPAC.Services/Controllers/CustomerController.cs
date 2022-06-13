// <copyright file="CustomerController.cs" company="PlaceholderCompany">
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
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerBl customerBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomerController"/> class.
        /// </summary>
        /// <param name="customerBusiness">customerBusiness.</param>
        public CustomerController(ICustomerBl customerBusiness)
        {
            this.customerBusiness = customerBusiness;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="customerRequest">customerRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("RegistryCustomer")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult RegistryCustomer([FromBody] RegistryCustomerRequest customerRequest)
        {
            return this.Ok(this.customerBusiness.RegistryCustomer(this.Request, customerRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="customerRequest">customerRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetCustomerInfo")]
        [Produces(typeof(Response<GetCustomerInfoResponse>))]
        public IActionResult GetCustomerInfo([FromBody] CustomerRequest customerRequest)
        {
            return this.Ok(this.customerBusiness.GetCustomerInfo(this.Request, customerRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="customerRequest">customerRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("UpdateCustomer")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult UpdateCustomer([FromBody] UpdateCustomerRequest customerRequest)
        {
            return this.Ok(this.customerBusiness.UpdateCustomer(this.Request, customerRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="customer">customer.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetCustomerPlans")]
        [Produces(typeof(Response<CustomerPlansResponse>))]
        public IActionResult GetCustomerPlans([FromBody] CustomerRequest customer)
        {
            return this.Ok(this.customerBusiness.GetCustomerPlan(this.Request, customer));
        }

        // [HttpPost]
        // [EnableCors("CorsPolicy")]
        // [Route("GetCustomerPlansx")]
        // [Produces(typeof(Response<CustomerPlansResponse>))]
        // public IActionResult GetCustomerPlansx([FromBody] CustomerRequest customer)
        // {
        //    throw new System.ArgumentNullException("stateReg");
        //    return Ok(_CustomerBusiness.GetCustomerPlan(this.Request, customer));
        // }
    }
}