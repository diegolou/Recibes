// <copyright file="IPaymentBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// IPaymentBl.
    /// </summary>
    public interface IPaymentBl
    {
        /// <summary>
        /// SubmitPayment.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="payment">payment.</param>
        /// <returns>returns.</returns>
        public Response<PaymentResponse> SubmitPayment(HttpRequest request, SubmitPaymentRequest payment);

        /// <summary>
        /// ProcessPayment.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="paymentId">paymentId.</param>
        /// <returns>returns.</returns>
        public Response<PaymentResponse> ProcessPayment(HttpRequest request, string paymentId);
    }
}