namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class EmailType : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string code
        {
            get => PartitionKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string tipo
        {
            get => RowKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string bodyheat { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string bodyfoot { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string sign { get; set; }
    }
}