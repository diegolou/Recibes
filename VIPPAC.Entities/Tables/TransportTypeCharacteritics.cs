namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class TransportTypeCharacteristics : TableEntity
    {
        public string IdTTC { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string CodeTTC { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string DescriptionTTC { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double WeightLimit { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string SizeLimit { get; set; }
    }
}