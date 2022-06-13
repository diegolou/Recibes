// <copyright file="Enums.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities
{
    /// <summary>
    /// PackerFilterType.
    /// </summary>
    public enum PackerFilterType
    {
        /// <summary>
        /// Creating.
        /// </summary>
        Creating = 1,

        /// <summary>
        /// WaitingPayment.
        /// </summary>
        WaitingPayment = 2,

        /// <summary>
        /// Waiting.
        /// </summary>
        Waiting = 3,

        /// <summary>
        /// Running.
        /// </summary>
        Running = 4,

        /// <summary>
        /// Finalized
        /// </summary>
        Finalized = 5,

        /// <summary>
        /// All.
        /// </summary>
        All = 6,
    }

    /// <summary>
    /// HolidayNextDay.
    /// </summary>
    public enum HolidayNextDay
    {
        /// <summary>
        /// Sunday.
        /// </summary>
        Sunday = 0,

        /// <summary>
        /// Monday.
        /// </summary>
        Monday = 1,

        /// <summary>
        /// Tuesday.
        /// </summary>
        Tuesday = 2,

        /// <summary>
        /// Wednesday
        /// </summary>
        Wednesday = 3,

        /// <summary>
        /// Thursday.
        /// </summary>
        Thursday = 4,

        /// <summary>
        /// Friday.
        /// </summary>
        Friday = 5,

        /// <summary>
        /// Saturday.
        /// </summary>
        Saturday = 6,

        /// <summary>
        /// None.
        /// </summary>
        None = 7,
    }

    /// <summary>
    /// Holliday.
    /// </summary>
    public enum HolidayType
    {
        /// <summary>
        /// Normal.
        /// </summary>
        Normal = 0,

        /// <summary>
        /// Easter.
        /// </summary>
        Easter = 1,
    }
}