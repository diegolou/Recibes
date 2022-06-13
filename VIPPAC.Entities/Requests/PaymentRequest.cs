// <copyright file="PaymentRequest.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities
{
    /// <summary>
    /// PaymentRequest.
    /// </summary>
    public class PaymentRequest
    {
        /// <summary>
        /// Gets or sets pSE, CREDIT, CASH, NEQUI.
        /// </summary>
        public string Payment_Type { get; set; }

        /// <summary>
        /// Gets or sets estado de la transaccion PENDING, AVAILABLE, VOIDED, DECLINED, ERROR.
        /// </summary>
        public string Payment_Status { get; set; }

        /// <summary>
        /// Gets or sets nombre.
        /// </summary>
        public string Payment_Token { get; set; }

        /// <summary>
        /// Gets or sets Payment_Feature.
        /// </summary>
        public string Payment_Feature { get; set; }

        /// <summary>
        /// Gets or sets referencia única de pago.
        /// </summary>
        public string Payment_Reference { get; set; }

        /// <summary>
        /// Gets or sets iD de la fuente de pago.
        /// </summary>
        public double Payment_source_id { get; set; }

        /// <summary>
        /// Gets or sets tipo de modena COL = 'COP' USA = 'US'.
        /// </summary>
        public string Payment_Currency { get; set; }

        /// <summary>
        /// Gets or sets Token de Acceptación.
        /// </summary>
        public string Payment_Acceptance_Token { get; set; }

        /// <summary>
        /// Gets or sets cuotas.
        /// </summary>
        public double Payment_Cuotas { get; set; }

        /// <summary>
        /// Gets or sets error type.
        /// </summary>
        public string Error_type { get; set; }

        /// <summary>
        /// Gets or sets Error Reason .
        /// </summary>
        public string Error_Reason { get; set; }
    }
}