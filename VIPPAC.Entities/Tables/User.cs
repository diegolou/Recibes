namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    /// User Table
    /// </summary>
    public class User : TableEntity
    {
        /// <summary>
        /// Get or Sets User Type
        /// </summary>
        //[IgnoreProperty]
        //public string Profile
        //{
        //    get => PartitionKey;
        //    set => PartitionKey = value;
        //}
        public string Profile { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Get or Sets User Name
        /// </summary>
        //[IgnoreProperty]
        //public string Email
        //{
        //    get => RowKey;
        //    set => RowKey =  value;
        //}
        /// <summary>
        ///
        /// </summary>
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public int Attempts { get; set; }

        public string Status { get; set; }
    }
}