namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class PackageType : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public int Code { get => Int32.Parse(PartitionKey); }

        /// <summary>
        ///
        /// </summary>
        public string Name { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public int ServiceCode { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Tarifa_ini { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Tarife_sec { get; set; }

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
        public double Recargo_noc { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Recargo_fest { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double WeightLimit { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string SizeLimit { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double DistanceLimit { get; set; }
    }
}