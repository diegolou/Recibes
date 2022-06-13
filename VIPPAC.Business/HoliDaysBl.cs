// <copyright file="HoliDaysBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using VIPPAC.Business.Referentials;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Responses;
    using VIPPAC.Entities.Tables;

    /// <summary>
    /// .
    /// </summary>
    public class HolidaysBl : BusinessBase<HoliDays>, IHoliDaysBl
    {
        private readonly IGenericRep<HoliDays> holiDays;

        /// <summary>
        /// Initializes a new instance of the <see cref="HolidaysBl"/> class.
        /// </summary>
        /// <param name="holiDays">holiDays.</param>
        public HolidaysBl(IGenericRep<HoliDays> holiDays)
        {
            this.holiDays = holiDays;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="date">date.</param>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        public Response<IsHolidayResponse> IsHoliday(DateTime date, string country)
        {
            bool rta = false;
            if (!this.SearchNormalDay(date, out string name))
            {
                rta = true;
            }
            else if (date.DayOfWeek == 0)
            {
                name = date.ToString("dddd");
                rta = true;
            }
            else if (this.IsEastern(date, out name))
            {
                rta = true;
            }

            return ResponseSuccess<IsHolidayResponse>(new List<IsHolidayResponse>() { new IsHolidayResponse() { Holiday = rta, Name = name } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="country">Country.</param>
        /// <returns>returns.</returns>
        public Response<HoliDaysResponse> GetHoliDays(string country)
        {
            var result = this.holiDays.GetByPatitionKeyAsync(country).Result;
            List<HoliDaysResponse> response = new List<HoliDaysResponse>();
            result.ForEach(r =>
            {
                response.Add(new HoliDaysResponse
                {
                    CountryCode = r.CountryCode,
                    Id = r.Id,
                    Celebration = r.Celebration,
                    HolidayType = r.HolidayType,
                    Day = r.Day,
                    Order = r.Order,
                    DaysToSum = r.DaysToSum,
                });
            });
            return ResponseSuccess(response);
        }

        private DateTime CalculoEquinoccio(DateTime date)
        {
            var year = date.Year;
            var a = year % 19;
            var b = Math.Floor((double)year / 100);
            var c = year % 100;
            var d = Math.Floor(b / 4);
            var e = b % 4;
            var f = Math.Floor((b + 8) / 25);
            var g = Math.Floor((b - f + 1) / 3);
            var h = ((19 * a) + b - d - g + 15) % 30;
            var i = Math.Floor((double)c / 4);
            var k = c % 4;
            var l = (32 + (2 * e) + (2 * i) - h - k) % 7;
            var m = Math.Floor((a + (11 * h) + (22 * l)) / 451);
            var n = h + l - (7 * m) + 114;
            var month = Math.Floor(n / 31);
            var day = 1 + (n % 31);
            return new DateTime(year, (int)month, (int)day);
        }

        private bool IsEastern(DateTime date, out string name)
        {
            name = date.ToString("dddd");
            var holiDaysList = this.holiDays.GetListAsync().Result;
            DateTime easternP = new DateTime(1900, 1, 1);
            var mesdia = date.ToString("MM-dd");
            var holidayList = holiDaysList.Where(x => x.HolidayType == (int)HolidayType.Easter).OrderBy(x => x.Order).ToList();
            var eastern = this.CalculoEquinoccio(date);

            foreach (var holiDay in holidayList)
            {
                _ = int.TryParse(holiDay.Day, out int day);
                easternP = eastern.AddDays(day);
                switch ((HolidayNextDay)holiDay.DaysToSum)
                {
                    case HolidayNextDay.Monday:
                        if ((int)easternP.DayOfWeek != (int)HolidayNextDay.Monday)
                        {
                            var j = (int)easternP.DayOfWeek;
                            if (j == 0)
                            {
                                j = 7;
                            }

                            easternP = easternP.AddDays(8 - (int)j);
                        }

                        break;
                }

                if (easternP.ToString("MM-dd") == mesdia)
                {
                    name = holiDay.Celebration;
                    return true;
                }
            }

            return false;
        }

        private bool SearchNormalDay(DateTime date, out string name)
        {
            var holiDaysList = this.holiDays.GetListAsync().Result;
            var mesdia = date.ToString("MM-dd");
            var holidayList = holiDaysList.Where(x => x.HolidayType == (int)HolidayType.Normal).OrderBy(x => x.Order).ToList();
            foreach (var holiDay in holidayList)
            {
                name = holiDay.Celebration;
                switch ((HolidayNextDay)holiDay.DaysToSum)
                {
                    case HolidayNextDay.Monday:
                        var x = holiDay.Day.Split("-", 2);
                        var date_i = new DateTime(date.Year, int.Parse(x[0]), int.Parse(x[1]));
                        if ((int)date_i.DayOfWeek != (int)HolidayNextDay.Monday)
                        {
                            var j = (int)date_i.DayOfWeek;
                            if (j == 0)
                            {
                                j = 7;
                            }

                            date_i = date_i.AddDays(8 - (int)j);
                        }

                        var newdate = date_i.ToString("MM-dd");
                        if (newdate == mesdia)
                        {
                            return false;
                        }

                        break;

                    case HolidayNextDay.None:
                        if (mesdia == holiDay.Day)
                        {
                            return false;
                        }

                        break;

                    default:
                        break;
                }
            }

            name = date.ToString("dddd");
            return true;
        }
    }
}