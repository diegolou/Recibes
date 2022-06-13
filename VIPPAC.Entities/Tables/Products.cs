namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Products : TableEntity
    {
        
        /// <summary>
        ///
        /// </summary>
        public string CompanyCode
        {
            get => PartitionKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string ProductCode
        {
            get => RowKey;
        }
        /// <summary>
        ///
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Unit { get; set; }
        /// <summary>
        ///
        /// </summary>
        public double Price { get; set; }
        /// <summary>
        ///
        /// </summary>
        public double Tax { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string Image { get; set; }
    }
}