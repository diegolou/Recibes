namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class CustomerLocation : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string CustomerId { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string LocationId { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public string Name { get; set; }

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
        //public string Instruccions { get; set; }
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
        public string Formattedaddress { get; set; }

        /// <summary>
        ///
        /// </summary>
        //public string Type { get; set; }
    }
}