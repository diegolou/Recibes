// <copyright file="PaymentBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.Json;
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Business.Referentials;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;
    using VIPPAC.Entities.Tables;
    using VIPPAC.ExternalServices;
    using VIPPAC.Utils;
    using VIPPAC.Utils.Enum;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// PaymentBl.
    /// </summary>
    public class PaymentBl : BusinessBase<RegPackage>, IPaymentBl
    {
        private readonly IGenericRep<Payment> payment;

        private readonly IGenericRep<RegPackage> regPackage;

        private readonly WampiService wampiServices;

        /// <summary>
        /// Initializes a new instance of the <see cref="PaymentBl"/> class.
        /// </summary>
        /// <param name="payment">payment.</param>
        /// <param name="paymentDetail">paymentDetail.</param>
        /// <param name="regPackage">regPackage.</param>
        /// <param name="wampiServices">wampiServices.</param>
        public PaymentBl(
            IGenericRep<Payment> payment,
            IGenericRep<RegPackage> regPackage,
            WampiService wampiServices)
        {
            this.payment = payment;
            this.regPackage = regPackage;
            this.wampiServices = wampiServices;
        }

        /// <summary>
        /// SubmitPayment.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="payment">payment.</param>
        /// <returns>returns.</returns>
        public Response<PaymentResponse> SubmitPayment(HttpRequest request, SubmitPaymentRequest payment)
        {
            var activityId = string.Empty;
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (payment == null)
            {
                this.RegistryLog("App", "Submit Payment", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("SubmitPayment");
            }

            var errorsMessage = payment.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Submit Payment", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
            }

            // se busca la información de la actividad
            var resultAct = this.regPackage.GetByPartitionKeyAndRowKeyAsync(payment.CustomerId, payment.ActivityId.ToString(), FilterType.None).Result;

            if (resultAct is null || resultAct.Count == 0)
            {
                return this.ResponseFail<PaymentResponse>(ServiceResponseCode.ActivityNotFound);
            }

            // se busca el pago asociado
            var resultPayment = this.payment.GetByPartitionKeyAndRowKeyAsync(payment.CustomerId, payment.PaymentId, FilterType.None).Result;

            if (resultPayment is null || resultAct.Count == 0)
            {
                return this.ResponseFail<PaymentResponse>(ServiceResponseCode.PaymentNotFound);
            }

            resultPayment[0].Payment_Status = payment.PaymentState;
            bool updatePayment = this.payment.AddOrUpdate(resultPayment[0]).Result;

            if (!updatePayment)
            {
                this.RegistryLog("App", "Submit Payment", Utils.Enum.StateLog.Error, "Could not update payment status", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<PaymentResponse>(ServiceResponseCode.PaymentStatusError);
            }

            // se actualiza la actividad segun estado del pago realizado
            if (payment.PaymentState == PaymentStatus.Approved)
            {
                resultAct[0].Status = PackageStatus.Waiting.ToString();

                _ = this.regPackage.AddOrUpdate(resultAct[0]).Result;
            }

            return ResponseSuccess(
                new List<PaymentResponse>()
                {
                    new PaymentResponse
                    {
                        Response = payment.PaymentState,
                        ActivityId = payment.PaymentState == PaymentStatus.Approved ? payment.ActivityId.ToString() : string.Empty,
                    },
                });
        }

        /// <summary>
        /// ProcessPayment.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="paymentId">paymentId.</param>
        /// <returns>returns.</returns>
        public Response<PaymentResponse> ProcessPayment(HttpRequest request, string paymentId)
        {
            DateTime startTime = DateTime.UtcNow;
            if (paymentId == null)
            {
                this.RegistryLog("App", "Process Payment", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("ProcessPayment");
            }

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            // Recuperar la información del servicio de Wampi
            var responseWampi = this.wampiServices.GetWampiResultAsync(paymentId).Result;

            if (responseWampi.StatusCode != System.Net.HttpStatusCode.OK)
            {
                // Hay un error tengo que hacer algo
            }

            // Obtengo la respuesta de Wampi
            var value = responseWampi.Content.ReadAsStringAsync().Result;
            var response = JsonSerializer.Deserialize<WampiResponse>(value, options);

            // se busca los registros con la referencia que llego en la respuesta de Wampi.
            var resultPayment = this.payment.GetSomeAsync("Payment_Reference", response.Data.Reference).Result;

            if (resultPayment is null || resultPayment.Count == 0)
            {
                // No se encontro la referencia de pago en la base de datos
                // TODO: se dede validar que hacer.
                return this.ResponseFail<PaymentResponse>(ServiceResponseCode.PaymentNotFound);
            }

            var activityId = string.Empty;
            var paymentStatus = string.Empty;
            var packageStatus = string.Empty;
            switch (response.Data.Status)
            {
                case "APPROVED":
                    // se obtiene la referencia del pago
                    resultPayment[0].Payment_Status = PaymentStatus.Approved;
                    paymentStatus = "APPROVED";
                    packageStatus = PackageStatus.Waiting.ToString();
                    activityId = resultPayment[0].ActivityId;
                    break;

                case "DECLINED":
                    paymentStatus = "DECLINED";
                    resultPayment[0].Payment_Status = PaymentStatus.Declined;
                    packageStatus = PackageStatus.WaitingPayment.ToString();
                    break;

                case "ERROR":
                    paymentStatus = "ERROR";
                    resultPayment[0].Payment_Status = PaymentStatus.Error;
                    packageStatus = PackageStatus.WaitingPayment.ToString();
                    break;
            }

            // Actualiza el estado del pago
            if (!this.payment.AddOrUpdate(resultPayment[0]).Result)
            {
                this.RegistryLog("App", "Process Payment", Utils.Enum.StateLog.Error, "Could not update payment status", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<PaymentResponse>(ServiceResponseCode.PaymentStatusError);
            }

            if (packageStatus == PackageStatus.Waiting.ToString())
            {
                // se actualiza el estado del paquete para que se empiece a ejecutar el proceso del pago
                var regPackage = this.regPackage.GetAsync(activityId, FilterType.None).Result;
                regPackage.Status = packageStatus;
                if (!this.regPackage.AddOrUpdate(regPackage).Result)
                {
                    this.RegistryLog("App", "Process Payment", Utils.Enum.StateLog.Error, "Could not update RegPackage status", string.Empty, startTime, DateTime.UtcNow);
                    return this.ResponseFail<PaymentResponse>(ServiceResponseCode.PaymentStatusError);
                }
            }

            return ResponseSuccess(
                new List<PaymentResponse>()
                {
                    new PaymentResponse
                    {
                        Response = paymentStatus,
                        ActivityId = activityId,
                    },
                });
        }
    }
}