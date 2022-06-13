using Microsoft.WindowsAzure.Storage.Table;

namespace VIPPAC.Entities.Tables
{
    public class CustomerPlans : TableEntity
    {
        /// <summary>
        ///
        /// </summary>
        public string Customer { get => PartitionKey; }

        /// <summary>
        ///
        /// </summary>
        public string CustomerPlanId { get => RowKey; }

        /// <summary>
        ///
        /// </summary>
        public string PlanId { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string PlanName { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Balance { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Currency { get; set; }
    }
}