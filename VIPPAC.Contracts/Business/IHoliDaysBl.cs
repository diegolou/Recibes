// <copyright file="IHoliDaysBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Contracts.Business
{
    using System;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// .
    /// </summary>
    public interface IHoliDaysBl
    {
        /// <summary>
        /// .
        /// </summary>
        /// <param name="date">date.</param>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        Response<IsHolidayResponse> IsHoliday(DateTime date, string country);

        /// <summary>
        /// .
        /// </summary>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        Response<HoliDaysResponse> GetHoliDays(string country);
    }
}