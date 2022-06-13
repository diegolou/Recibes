// <copyright file="GetRateResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities.Responses
{
    /// <summary>
    /// GetRateResponse.
    /// </summary>
    public class GetRateResponse
    {
        /// <summary>
        /// Gets or sets Active.
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Gets or sets DistanceLimit.
        /// </summary>
        public double DistanceLimit { get; set; }

        /// <summary>
        /// Gets or sets Distance_sec.
        /// </summary>
        public double Distance_sec { get; set; }

        /// <summary>
        /// Gets or sets Distancia_ini.
        /// </summary>
        public double Distancia_ini { get; set; }

        /// <summary>
        /// Gets or sets Image.
        /// </summary>
        public string Image { get; set; }

        /// <summary>
        /// Gets or sets Recargo_fest.
        /// </summary>
        public double Recargo_fest { get; set; }

        /// <summary>
        /// Gets or sets Recargo_noc.
        /// </summary>
        public double Recargo_noc { get; set; }

        /// <summary>
        /// Gets or sets Tarifa_ini.
        /// </summary>
        public double Tarifa_ini { get; set; }

        /// <summary>
        /// Gets or sets Tarifa_mts.
        /// </summary>
        public double Tarifa_mts { get; set; }

        /// <summary>
        /// Gets or sets Tarife_sec.
        /// </summary>
        public double Tarife_sec { get; set; }
    }
}