namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class City : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string State
        {
            get => PartitionKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string Name
        {
            get => RowKey;
        }

        /// <summary>
        ///
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string GoogleMapCP { get; set; }

        /// <summary>
        ///
        /// </summary>
        public Guid CodeGuid { get; set; }
    }
}