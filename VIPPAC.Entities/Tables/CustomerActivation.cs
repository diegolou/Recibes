namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class CustomerActivation : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string CustomerId
        {
            get => PartitionKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string ActivationCode
        {
            get => RowKey;
        }

        /// <summary>
        ///
        /// </summary>
        public DateTime CodeExpires { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool Used { get; set; }
    }
}