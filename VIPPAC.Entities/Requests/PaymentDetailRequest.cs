namespace VIPPAC.Entities
{
    using System;

    public class PaymentDetailRequest
    {
        ///// <summary>
        ///// Id del Pago
        ///// </summary>
        //public string PaymentId { get; set; }

        /// <summary>
        /// Gets or sets date Payment.
        /// </summary>
        public DateTime DatePayment { get; set; }

        /// <summary>
        /// Gets or sets tarifa Base.
        /// </summary>
        public double BaseRate { get; set; }

        /// <summary>
        /// Gets or sets Recargo Distancia.
        /// </summary>
        public double DistSurcharge { get; set; }

        /// <summary>
        /// Gets or sets Recargo Ciudad Aledaña.
        /// </summary>
        public double ScitySurcharge { get; set; }

        /// <summary>
        /// Gets or sets Recargo Nocturno.
        /// </summary>
        public double NSurcharge { get; set; }

        /// <summary>
        /// Gets or sets Recargo Festivos.
        /// </summary>
        public double HSurcharge { get; set; }

        /// <summary>
        /// Gets or sets Recargo por Paradas.
        /// </summary>
        public double SSurcharge { get; set; }

        /// <summary>
        /// Gets or sets IVSurcharge.
        /// </summary>
        public double IVSurcharge { get; set; }

        /// <summary>
        /// Gets or sets InsuranceValue.
        /// </summary>
        public double InsuranceValue { get; set; }

        /// <summary>
        /// Gets or sets tip.
        /// </summary>
        public double Tip { get; set; }

        /// <summary>
        /// Gets or sets tax.
        /// </summary>
        public double Tax { get; set; }

        /// <summary>
        /// Gets or sets total.
        /// </summary>
        public double Total { get; set; }
    }
}