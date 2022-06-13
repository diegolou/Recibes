namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Parameter : TableEntity
    {
        public string Type
        {
            get => PartitionKey;
        }

        /// <summary>
        /// Get or Sets Id
        /// </summary>
        public string Id
        {
            get => RowKey;
        }

        /// <summary>
        /// Get or Sets Value
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string ValueAdd { get; set; }

        public string ValueAdd2 { get; set; }

        /// <summary>
        /// Get or Sets Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Get or Sets Sort By
        /// </summary>
        public string SortBy { get; set; }

        /// <summary>
        ///  Get or image
        /// </summary>
        public string ImageFile { get; set; }

        /// <summary>
        /// Required
        /// </summary>
        public bool Required { get; set; }
    }
}