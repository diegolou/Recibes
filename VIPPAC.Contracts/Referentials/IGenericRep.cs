// <copyright file="IGenericRep.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Contracts.Referentials
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using VIPPAC.Entities;
    using VIPPAC.Utils.Enum;

    /// <summary>
    /// IGenericRep.
    /// </summary>
    /// <typeparam name="T">T.</typeparam>
    public interface IGenericRep<T>
        where T : class, new()
    {
        /// <summary>
        /// Creates the table in storage.
        /// </summary>
        /// <returns>returns.</returns>
        Task CreateTableInStorage();

        /// <summary>
        /// Adds the or update.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        Task<bool> AddOrUpdate(T entity, FilterType filter = FilterType.None);

        /// <summary>
        /// Adds.
        /// </summary>
        /// <param name="entity">entity.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        Task<bool> Add(T entity, FilterType filter = FilterType.None);

        /// <summary>
        /// Add multiple entity.
        /// </summary>
        /// <param name="entities">entities.</param>
        /// <returns>returns.</returns>
        Task<bool> MultipleAdds(List<T> entities);

        /// <summary>
        /// Delete.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns>returns.</returns>
        Task<bool> DeleteRowAsync(T entity);

        /// <summary>
        /// Gets the asynchronous.
        /// </summary>
        /// <param name="rowKey">The row key.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        Task<T> GetAsync(string rowKey, FilterType filter = FilterType.None);

        /// <summary>
        /// Gets the asynchronous.
        /// </summary>
        /// <param name="rowKey">The row key.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetAllAsync(string rowKey, FilterType filter = FilterType.None);

        /// <summary>
        ///  Gets all rows from a table.
        /// </summary>
        /// <returns>returns.</returns>
        Task<List<T>> GetAllAsync();

        /// <summary>
        /// Gets all rows from a table.
        /// </summary>
        /// <returns>returns.</returns>
        Task<List<T>> GetListAsync();

        /// <summary>
        /// Consulta table storage by partitionKey.
        /// </summary>
        /// <param name="partitionKey">partitionKey.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetByPatitionKeyAsync(string partitionKey);

        /// <summary>
        /// Get by GetByPartitionKeyAndRowKeyAsync.
        /// </summary>
        /// <param name="partitionKey">partitionKey.</param>
        /// <param name="rowKey">rowKey.</param>
        /// <param name="filter">filter.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetByPartitionKeyAndRowKeyAsync(string partitionKey, string rowKey, FilterType filter = FilterType.Lower);

        /// <summary>
        /// Gets some asynchronous.
        /// </summary>
        /// <param name="column">The column.</param>
        /// <param name="value">The value.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetSomeAsync(string column, string value);

        /// <summary>
        /// GetSomeAsync.
        /// </summary>
        /// <param name="conditionParameters">conditionParameters.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetSomeAsync(IList<ConditionParameter> conditionParameters);

        /// <summary>
        /// GetListQuery.
        /// </summary>
        /// <param name="conditionParameters">conditionParameters.</param>
        /// <returns>returns.</returns>
        Task<List<T>> GetListQueryAsync(IList<ConditionParameter> conditionParameters);
    }
}