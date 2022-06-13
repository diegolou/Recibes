// <copyright file="TableStorageBase.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.DataAccess.Referentials
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Table;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Utils.Enum;

    /// <summary>
    /// Table Storage Base.
    /// </summary>
    /// <typeparam name="T">T.</typeparam>
    public class TableStorageBase<T> : IGenericRep<T>
        where T : TableEntity, new()
    {
        /// <summary>
        /// The table name.
        /// </summary>
        private readonly string tableName = typeof(T).Name;

        /// <summary>
        /// The table storage settings.
        /// </summary>
        private readonly UserSecretSettings tableStorageSettings;

        /// <summary>
        /// The table.
        /// </summary>
        private CloudTable table;

        /// <summary>
        /// Initializes a new instance of the <see cref="TableStorageBase{T}"/> class.
        /// </summary>
        /// <param name="options">options.</param>
        public TableStorageBase(IOptions<UserSecretSettings> options)
        {
            this.tableStorageSettings = options?.Value;
            this.CreateTableReference();
            this.CreateTableInStorage().GetAwaiter();
        }

        /// <summary>
        /// Gets the table.
        /// </summary>
        /// <value>
        /// The table.
        /// </value>
        private CloudTable Table
        {
            get
            {
                if (this.table == null)
                {
                    this.CreateTableReference();
                }

                return this.table;
            }
        }

        /// <summary>
        /// Add row to table T.
        /// </summary>
        /// <param name="entity">entity.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        public virtual async Task<bool> Add(T entity, FilterType filter = FilterType.None)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            switch (filter)
            {
                case FilterType.Lower:
                    entity.PartitionKey = entity?.PartitionKey.ToLower(CultureInfo.CurrentCulture);
                    entity.RowKey = entity.RowKey.ToLower(CultureInfo.CurrentCulture);
                    break;

                case FilterType.Upper:
                    entity.PartitionKey = entity?.PartitionKey.ToUpper(CultureInfo.CurrentCulture);
                    entity.RowKey = entity.RowKey.ToUpper(CultureInfo.CurrentCulture);
                    break;

                default:
                    break;
            }

            var operation = TableOperation.Insert(entity);
            int result = (await this.Table.ExecuteAsync(operation).ConfigureAwait(false)).HttpStatusCode;
            return (result / 100).Equals(2);
        }

        /// <inheritdoc />
        /// <summary>
        /// Adds the or update person.
        /// </summary>
        /// <returns><c>true</c>, if or update person was added, <c>false</c> otherwise.</returns>
        /// <param name="entity">Device.</param>
        /// <param name="filter">filter.</param>
        public virtual async Task<bool> AddOrUpdate(T entity, FilterType filter = FilterType.None)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            switch (filter)
            {
                case FilterType.Lower:
                    entity.PartitionKey = entity?.PartitionKey.ToLower(CultureInfo.CurrentCulture);
                    entity.RowKey = entity.RowKey.ToLower(CultureInfo.CurrentCulture);
                    break;

                case FilterType.Upper:
                    entity.PartitionKey = entity?.PartitionKey.ToUpper(CultureInfo.CurrentCulture);
                    entity.RowKey = entity.RowKey.ToUpper(CultureInfo.CurrentCulture);
                    break;

                default:
                    break;
            }

            var operation = TableOperation.InsertOrMerge(entity);
            int result = (await this.Table.ExecuteAsync(operation).ConfigureAwait(false)).HttpStatusCode;
            return (result / 100).Equals(2);
        }

        /// <summary>
        /// Creates the table in storage.
        /// </summary>
        /// <returns>returns.</returns>
        public async Task CreateTableInStorage()
        {
            await this.Table.CreateIfNotExistsAsync().ConfigureAwait(false);
        }

        /// <summary>
        /// Delete row of table T.
        /// </summary>
        /// <param name="entity">entity.</param>
        /// <returns>returns.</returns>
        public async Task<bool> DeleteRowAsync(T entity)
        {
            var operation = TableOperation.Delete(entity);
            int result = (await this.Table.ExecuteAsync(operation).ConfigureAwait(false)).HttpStatusCode;
            return (result / 100).Equals(2);
        }

        /// <inheritdoc />
        /// <summary>
        /// Gets the list of rows match with rowKey person.
        /// </summary>
        /// <returns>Lists of Rows.</returns>
        /// <param name="rowKey">User name.</param>
        /// <param name="filter">filter.</param>
        public async Task<List<T>> GetAllAsync(string rowKey, FilterType filter = FilterType.None)
        {
            switch (filter)
            {
                case FilterType.Upper:
                    rowKey = rowKey?.ToUpper(CultureInfo.CurrentCulture);
                    break;

                case FilterType.Lower:
                    rowKey = rowKey?.ToLower(CultureInfo.CurrentCulture);
                    break;

                default:
                    break;
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>().Where(TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, rowKey));
            var entity = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entity;
        }

        /// <summary>
        /// Get all rows from a entity T.
        /// </summary>
        /// <returns>retruns.</returns>
        public async Task<List<T>> GetAllAsync()
        {
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(new TableQuery<T>(), null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <inheritdoc />
        /// <summary>
        /// Gets the person.
        /// </summary>
        /// <returns>The person.</returns>
        /// <param name="rowKey">User name.</param>
        /// <param name="filter">filter.</param>
        public async Task<T> GetAsync(string rowKey, FilterType filter = FilterType.None)
        {
            switch (filter)
            {
                case FilterType.Upper:
                    rowKey = rowKey?.ToUpper(CultureInfo.CurrentCulture);
                    break;

                case FilterType.Lower:
                    rowKey = rowKey?.ToLower(CultureInfo.CurrentCulture);
                    break;

                default:
                    break;
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>().Where(TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, rowKey));
            var entity = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results.FirstOrDefault();
            return entity;
        }

        /// <inheritdoc />
        /// <summary>
        /// Get by GetByPartitionKeyAndRowKeyAsync.
        /// </summary>
        /// <param name="partitionKey"></param>
        /// <param name="rowKey"></param>
        /// <param name="filter">filter.</param>
        /// <returns></returns>
        public async Task<List<T>> GetByPartitionKeyAndRowKeyAsync(string partitionKey, string rowKey, FilterType filter = FilterType.Lower)
        {
            if (partitionKey == null)
            {
                throw new ArgumentNullException("partitionKey");
            }

            if (rowKey == null)
            {
                throw new ArgumentNullException("rowKey");
            }

            switch (filter)
            {
                case FilterType.Lower:
                    partitionKey = partitionKey.ToLower(CultureInfo.CurrentCulture);
                    rowKey = rowKey.ToLower(CultureInfo.CurrentCulture);
                    break;

                case FilterType.Upper:
                    partitionKey = partitionKey.ToUpper(CultureInfo.CurrentCulture);
                    rowKey = rowKey.ToUpper(CultureInfo.CurrentCulture);
                    break;

                default:
                    break;
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            var filterOne = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey);
            var filterTwo = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, rowKey);
            var query = new TableQuery<T>().Where(TableQuery.CombineFilters(filterOne, TableOperators.And, filterTwo));
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <inheritdoc />
        /// <summary>
        /// Get by partitionKey.
        /// </summary>
        /// <param name="partitionKey"></param>
        /// <returns></returns>
        public async Task<List<T>> GetByPatitionKeyAsync(string partitionKey)
        {
            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey));
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetInfoByQuery(string filter)
        {
            if (filter == null)
            {
                throw new ArgumentNullException("filter");
            }

            var query = new TableQuery<T>().Where(filter);
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <summary>
        /// Get List of Table T.
        /// </summary>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetListAsync()
        {
            TableQuery<T> query = new TableQuery<T>();

            List<T> results = new List<T>();
            TableContinuationToken continuationToken = null;
            do
            {
                TableQuerySegment<T> queryResults =
                    await this.Table.ExecuteQuerySegmentedAsync(query, continuationToken).ConfigureAwait(false);

                continuationToken = queryResults.ContinuationToken;
                results.AddRange(queryResults.Results);
            }
            while (continuationToken != null);

            return results;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="conditionParameters">conditionParameters.</param>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetListQueryAsync(IList<ConditionParameter> conditionParameters)
        {
            if (conditionParameters == null)
            {
                throw new ArgumentNullException("conditionParameters");
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>();
            List<string> conditions = new List<string>();
            string qry = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.NotEqual, string.Empty);
            foreach (var item in conditionParameters)
            {
                if (string.IsNullOrEmpty(item.Value))
                {
                    if (item.ValueDateTime == default)
                    {
                        conditions.Add(TableQuery.GenerateFilterConditionForBool(item.ColumnName, item.Condition, item.ValueBool));
                    }
                    else
                    {
                        conditions.Add(TableQuery.GenerateFilterConditionForDate(item.ColumnName, item.Condition, item.ValueDateTime));
                    }
                }
                else
                {
                    conditions.Add(TableQuery.GenerateFilterCondition(item.ColumnName, item.Condition, item.Value));
                }
            }

            foreach (string conditional in conditions)
            {
                qry = TableQuery.CombineFilters(conditional, TableOperators.And, qry);
            }

            query.Where(qry);

            List<T> results = new List<T>();
            TableContinuationToken continuationToken = null;
            do
            {
                TableQuerySegment<T> queryResults =
                    await this.Table.ExecuteQuerySegmentedAsync(query, continuationToken).ConfigureAwait(false);

                continuationToken = queryResults.ContinuationToken;
                results.AddRange(queryResults.Results);
            }
            while (continuationToken != null);

            return results;
        }

        /// <summary>
        /// Query Filter PartitionKey and TimeStamp.
        /// </summary>
        /// <param name="partitionKey">partitionKey.</param>
        /// <param name="beginDate">beginDate.</param>
        /// <param name="endDate">endDate.</param>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetParticionKeyAndTimeStampCompAsync(string partitionKey, DateTime beginDate, DateTime endDate)
        {
            if (partitionKey == null)
            {
                throw new ArgumentNullException("partitionKey");
            }

            if (beginDate == null)
            {
                throw new ArgumentNullException("beginDate");
            }

            if (endDate == null)
            {
                throw new ArgumentNullException("endDate");
            }

            var from = DateTime.SpecifyKind(beginDate, DateTimeKind.Utc);
            var until = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);
            await this.CreateTableInStorage().ConfigureAwait(false);
            var filterOne = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey);
            string dateFromFilter = TableQuery.GenerateFilterConditionForDate("Timestamp", QueryComparisons.GreaterThanOrEqual, from);
            string dateUntilFilter = TableQuery.GenerateFilterConditionForDate("Timestamp", QueryComparisons.LessThanOrEqual, until);
            string filter = TableQuery.CombineFilters(filterOne, TableOperators.And, dateFromFilter);
            filter = TableQuery.CombineFilters(filter, TableOperators.And, dateUntilFilter);
            var query = new TableQuery<T>().Where(filter);
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <inheritdoc />
        /// <summary>
        /// Gets some asynchronous.
        /// </summary>
        /// <param name="column">The column.</param>
        /// <param name="value">The value.</param>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetSomeAsync(string column, string value)
        {
            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>().Where(TableQuery.GenerateFilterCondition(column, QueryComparisons.Equal, value));
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <summary>
        /// Get Some Rows of table T.
        /// </summary>
        /// <param name="conditionParameters">conditionParameters.</param>
        /// <returns>returns.</returns>
        public async Task<List<T>> GetSomeAsync(IList<ConditionParameter> conditionParameters)
        {
            if (conditionParameters == null)
            {
                throw new ArgumentNullException("conditionParameters");
            }

            await this.CreateTableInStorage().ConfigureAwait(false);
            var query = new TableQuery<T>();
            List<string> conditions = new List<string>();
            string qry = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.NotEqual, string.Empty);
            foreach (var item in conditionParameters)
            {
                if (string.IsNullOrEmpty(item.Value))
                {
                    if (item.ValueDateTime == default)
                    {
                        conditions.Add(TableQuery.GenerateFilterConditionForBool(item.ColumnName, item.Condition, item.ValueBool));
                    }
                    else
                    {
                        conditions.Add(TableQuery.GenerateFilterConditionForDate(item.ColumnName, item.Condition, item.ValueDateTime));
                    }
                }
                else
                {
                    conditions.Add(TableQuery.GenerateFilterCondition(item.ColumnName, item.Condition, item.Value));
                }
            }

            foreach (string conditional in conditions)
            {
                qry = TableQuery.CombineFilters(conditional, TableOperators.And, qry);
            }

            query.Where(qry);
            var entities = (await this.Table.ExecuteQuerySegmentedAsync(query, null).ConfigureAwait(false)).Results;
            return entities;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="entities">entities.</param>
        /// <returns>returns.</returns>
        public virtual async Task<bool> MultipleAdds(List<T> entities)
        {
            bool rta = true;
            await this.CreateTableInStorage().ConfigureAwait(false);
            TableBatchOperation batchOperation = new TableBatchOperation();
            entities.ForEach(entity =>
            {
                batchOperation.Insert(entity);
            });
            try
            {
                IList<TableResult> result = await this.Table.ExecuteBatchAsync(batchOperation);
            }
            catch (StorageException)
            {
                rta = false;

                // var z = e.RequestInformation.HttpStatusCode;
                // var zz = 3;
            }

            return rta;
        }

        /// <summary>
        /// Creates the table reference.
        /// </summary>
        private void CreateTableReference()
        {
            var connectionString = this.tableStorageSettings.TableStorage;
            var account = CloudStorageAccount.Parse(connectionString);
            var client = account.CreateCloudTableClient();
            this.table = client.GetTableReference(this.tableName);
        }
    }
}