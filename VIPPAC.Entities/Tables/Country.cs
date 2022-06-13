namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Country : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string Code
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
        public string ShortCode { get; set; }

        /// <summary>
        ///
        /// </summary>
        public int CCode { get; set; }

        public bool IsActivated { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Lat { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Lng { get; set; }
    }
}