namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class GeolocalizacionPacker : TableEntity
    {
        /// <summary>
        /// Get or Sets Packer Id
        /// </summary>
        [IgnoreProperty]
        public string PackerId { get => PartitionKey; set => PartitionKey = value; }

        /// <summary>
        /// Get or Sets GeoId
        /// </summary>
        [IgnoreProperty]
        public string GeoId { get => RowKey; set => RowKey = value; }

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
        public double Altitude { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Accuracy { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Speed { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime TimeStampMobile { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string ActivityId { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Status { get; set; }
    }
}