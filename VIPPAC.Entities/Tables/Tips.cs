using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace VIPPAC.Entities.Tables
{
    /// <summary>
    /// Tips.
    /// </summary>
    public class Tips : TableEntity
    {
        /// <summary>
        /// Gets Country.
        /// </summary>
        public string Country { get => this.PartitionKey; }

        /// <summary>
        /// Gets Id.
        /// </summary>
        public Guid Id { get => Guid.Parse(this.RowKey); }

        /// <summary>
        /// Gets or Sets Value.
        /// </summary>
        public double Value { get; set; }
    }
}