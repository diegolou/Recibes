namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class PricebyCitybyTOT : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string CityCode { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string TOTCode { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public double Tarifa_ini { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool Active { get; set; }

        public double Tarifa_sec { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Tarifa_mts { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Distancia_ini { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Distance_sec { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Recargo_noc { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Recargo_fest { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Image { get; set; }

        public double DistanceLimit { get; set; }
    }
}