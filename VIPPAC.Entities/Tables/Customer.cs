namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    ///
    /// </summary>
    public class Customer : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string IdType { get; set; }

        public long IdNumber { get; set; }

        /// <summary>
        ///
        /// </summary>
        public long Mobile { get; set; }

        /// <summary>
        ///
        /// </summary>
        public int CountryCode { get; set; }

        public bool Retefuente { get; set; }

        public string ActaReteFuente { get; set; }

        public bool ReteIca { get; set; }

        public string ActaReteIca { get; set; }

        public bool Company { get; set; }

        ///// <summary>
        /////
        ///// </summary>
        //public string Address { get; set; }

        ///// <summary>
        /////
        ///// </summary>
        //public string City { get; set; }
        ///// <summary>
        /////
        ///// </summary>
        //public string State { get; set; }

        ///// <summary>
        /////
        ///// </summary>
        //public string Country { get; set; }
        /// <summary>
        ///
        /// </summary>
        public bool Terms { get; set; }
    }
}