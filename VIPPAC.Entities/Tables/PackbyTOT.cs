namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class PackbyTOT : TableEntity
    {
        /// <summary>
        /// Gets Tipo de paquete.
        /// </summary>
        public string Top
        {
            get => PartitionKey;
        }

        /// <summary>
        ///
        /// </summary>
        public string Tot
        {
            get => RowKey;
        }

        /// <summary>
        ///
        /// </summary>
        public int Priority { get; set; }
    }
}