namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class PrivatePlansCustomer : TableEntity
    {
        public string PlanId { get => PartitionKey; }
        public string CustomerId { get => RowKey; }
    }
}