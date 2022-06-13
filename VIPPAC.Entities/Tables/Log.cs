namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    /// Parameters Table
    /// </summary>
    public class Log : TableEntity
    {
        /// <summary>
        /// Get or Sets OpenTok Session Id
        /// </summary>
        [IgnoreProperty]
        public string LogType { get => PartitionKey; set => PartitionKey = value; }

        /// <summary>
        /// Get or Sets OpenTok Access Token
        /// </summary>
        [IgnoreProperty]
        public string LogId { get => RowKey; set => RowKey = value; }

        /// <summary>
        /// Caller
        /// </summary>
        public string Transaction { get; set; }

        /// <summary>
        /// Answered
        /// </summary>
        public int State { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Observations { get; set; }

        /// <summary>
        /// transaction details
        /// </summary>
        public string TransactionDetails { get; set; }

        /// <summary>
        /// Get or Sets Date Call
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime EndTime { get; set; }

        /// <summary>
        /// Remote Ip Adress
        /// </summary>
        public string RemoteIpAdress { get; set; }
    }
}