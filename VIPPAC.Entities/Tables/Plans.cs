namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Plans : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string Country { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string Code { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Value { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Discount { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Currency { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool Public { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool Active { get; set; }
    }
}