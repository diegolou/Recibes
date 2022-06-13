namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class State : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Country
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
    }
}