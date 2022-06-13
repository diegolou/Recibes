namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class Packer : TableEntity
    {
        public string PackerId { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public long Mobile { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string VehicleType { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Brand { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Reference { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string VehiclePlate { get; set; }
    }
}