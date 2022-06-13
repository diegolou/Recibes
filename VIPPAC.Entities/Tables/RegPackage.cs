namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class RegPackage : TableEntity
    {
        public string PackerID { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string CustomerId { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string ActivityId { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime PackerAssigDate { get; set; }
    }
}