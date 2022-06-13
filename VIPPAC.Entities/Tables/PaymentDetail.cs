namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    ///
    /// </summary>
    public class PaymentDetail : TableEntity
    {
        /// <summary>
        /// Customer Id
        /// </summary>
        public string CustomerId { get => PartitionKey; }

        /// <summary>
        /// Id del Pago
        /// </summary>
        public string PaymentId { get => RowKey; }

        /// <summary>
        /// Date Payment
        /// </summary>
        public DateTime DatePayment { get; set; }

        /// <summary>
        /// Tarifa Base
        /// </summary>
        public double BaseRate { get; set; }

        /// <summary>
        /// Recargo Distancia
        /// </summary>
        public double DistSurcharge { get; set; }

        /// <summary>
        /// Recargo Ciudad Aledaña
        /// </summary>
        public double ScitySurcharge { get; set; }

        /// <summary>
        /// Recargo Nocturno
        /// </summary>
        public double NSurcharge { get; set; }

        /// <summary>
        /// Recargo Festivos
        /// </summary>
        public double HSurcharge { get; set; }

        /// <summary>
        /// Recargo por Paradas
        /// </summary>
        public double SSurcharge { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double IVSurcharge { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double InsuranceValue { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Tip { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Tax { get; set; }

        /// <summary>
        /// Gets or sets total.
        /// </summary>
        public double Total { get; set; }
    }
}