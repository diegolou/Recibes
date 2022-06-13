// <copyright file="WampiService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.ExternalServices
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// .
    /// </summary>
    public class WampiService
    {
        private readonly HttpClient httpClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="WampiService"/> class.
        /// </summary>
        /// <param name="httpClient">httpClient.</param>
        public WampiService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="idTransaction">idTransaction.</param>
        /// <returns>returns.</returns>
        public virtual async Task<HttpResponseMessage> GetWampiResultAsync(string idTransaction)
        {
            try
            {
                return await this.httpClient.GetAsync($"/v1/transactions/{idTransaction}");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}