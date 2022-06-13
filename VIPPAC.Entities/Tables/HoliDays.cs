// <copyright file="HoliDays.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities.Tables
{
    using Microsoft.WindowsAzure.Storage.Table;

    public class HoliDays : TableEntity
    {
        public string CountryCode { get => this.PartitionKey; }

        public string Id { get => this.RowKey; }

        public string Day { get; set; }

        public int DaysToSum { get; set; }

        public string Celebration { get; set; }

        public int HolidayType { get; set; }

        public int Order { get; set; }
    }
}