// <copyright file="RateValue.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities.Responses
{
    using System.Collections.Generic;

    public class RateValue
    {
        public string Tp_code { get; set; }

        public string Tp_name { get; set; }

        public string Image { get; set; }

        public double WeightLimit { get; set; }

        public string SizeLimit { get; set; }

        public List<RateValueByCity> RateValueByCity { get; set; }
    }
}