// <copyright file="PaymentController.cs" company="PlaceholderCompany">
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
    /// PaymentController.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentBl payment;

        /// <summary>
        /// Initializes a new instance of the <see cref="PaymentController"/> class.
        /// </summary>
        /// <param name="payment">payment.</param>
        public PaymentController(IPaymentBl payment)
        {
            this.payment = payment;
        }

        /// <summary>
        /// SubmitPayment.
        /// </summary>
        /// <param name="paymentInfo">paymentInfo.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("SubmitPayment")]
        [Produces(typeof(Response<PaymentResponse>))]
        public IActionResult SubmitPayment([FromBody] SubmitPaymentRequest paymentInfo)
        {
            return this.Ok(this.payment.SubmitPayment(this.Request, paymentInfo));
        }

        /// <summary>
        /// ProcessPayment.
        /// </summary>
        /// <param name="paymentId">paymentId.</param>
        /// <returns>returns.</returns>
        [HttpGet]
        [EnableCors("CorsPolicy")]
        [Route("ProcessPayment")]
        [Produces(typeof(Response<PaymentResponse>))]
        public IActionResult ProcessPayment(string paymentId)
        {
            return this.Ok(this.payment.ProcessPayment(this.Request, paymentId));
        }
    }
}