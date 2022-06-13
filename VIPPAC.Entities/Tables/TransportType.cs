namespace VIPPAC.Entities.Tables
{
    using System;
    using Microsoft.WindowsAzure.Storage.Table;

    public class TransportType : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public int Code
        {
            get { return Int32.Parse(PartitionKey); }
        }

        /// <summary>
        ///
        /// </summary>
        public string Name { get => RowKey; }

        public int ServiceCode { get; set; }

        public string Type { get; set; }

        // public double tarifa_ini { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double tarife_sec { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double tarifa_mts { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double distancia_ini { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double recargo_noc { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double recargo_fest { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public string Image { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double weightLimit { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public string sizeLimit { get; set; }
        /// <summary>
        ///
        /// </summary>
        //public double distanceLimit { get; set; }
    }
}

//code: 15,
//    name: 'CAMIONETA',
//    ServiceCode: 3000,
//    type: 'DRIVING',
//    tarifa_ini: 5900,
//    tarife_sec: 4000,
//    tarifa_mts: 90,
//    distancia_ini: 4000,
//    recargo_noc: 1000,
//    recargo_fest: 1000,