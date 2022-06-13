namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    ///
    /// </summary>
    public class RegPackageAddress : TableEntity
    {
        public string Id { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string ActivityId { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string DirectionId { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Adnumber { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Instruccions { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string State { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string City { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Details { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Latitude { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Longitude { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string PostalCode { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Formattedaddress { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime ExecutionDate { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Remarks { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool HasImage { get; set; }
    }
}