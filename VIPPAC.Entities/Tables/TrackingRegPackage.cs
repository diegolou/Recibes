namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class TrackingRegPackage : TableEntity
    {
        /// <summary>
        /// Codígo de la actividad
        /// </summary>
        public string ActivityId { get => PartitionKey; }

        /// <summary>
        /// Id del tacking de la actividad
        /// </summary>
        public string TackingId { get => RowKey; }

        /// <summary>
        /// Id de la dorección de la actividad
        /// </summary>
        public string DirectionId { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string TrackingType { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Values { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Images { get; set; }
    }
}