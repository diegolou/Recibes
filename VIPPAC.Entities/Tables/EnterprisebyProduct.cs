
namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class EnterprisebyProduct : TableEntity
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
        public string CompanyName
        {
            get => RowKey;
        }
        /// <summary>
        ///
        /// </summary>
        public string Secteur { get; set; }

       
    }
}