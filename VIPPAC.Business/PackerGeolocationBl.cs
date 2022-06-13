// <copyright file="PackerGeolocationBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Http;
    using Microsoft.WindowsAzure.Storage.Table;
    using VIPPAC.Business.Referentials;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;
    using VIPPAC.Entities.Tables;
    using VIPPAC.Utils;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// .
    /// </summary>
    public class PackerGeolocationBl : BusinessBase<GeolocalizacionPacker>, IPackerGeolocationBl
    {
        private readonly IGenericRep<GeolocalizacionPacker> geoLocation;

        /// <summary>
        /// Initializes a new instance of the <see cref="PackerGeolocationBl"/> class.
        /// </summary>
        /// <param name="userRep">userRep.</param>
        /// <param name="logRep">logRep.</param>
        public PackerGeolocationBl(IGenericRep<GeolocalizacionPacker> userRep, IGenericRep<Log> logRep)
        {
            this.geoLocation = userRep;
            this.logRep = logRep;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="packer">packer.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> SetPackerGeoLocation(HttpRequest request, PackerGeolocationRequest packer)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (packer == null)
            {
                this.RegistryLog("AppPacker", "Set PAcker Geolocation", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = packer.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("AppPacker", "Set PAcker Geolocation", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var geoLocation = new GeolocalizacionPacker()
            {
                PartitionKey = packer.PackerId,
                RowKey = Guid.NewGuid().ToString(),
                Latitude = (double)packer.Latitude,
                Longitude = (double)packer.Longitude,
                Altitude = (double)packer.Altitude,
                Speed = (double)packer.Speed,
                Accuracy = (double)packer.Accuracy,
                TimeStampMobile = new DateTime(1970, 1, 1).AddMilliseconds((double)packer.TimeStampMobile),
                ActivityId = packer.ActivityId,
            };
            var result = this.geoLocation.Add(geoLocation).Result;
            if (!result)
            {
                this.RegistryLog("AppPacker", "Set PAcker Geolocation", Utils.Enum.StateLog.Error, "No puede guardar la geolocalizacion del PAcker", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // string message = string.Format("The Customer {0} {1} {2} created Correctly", user.FirstName, user.MiddleName, user.LastName);
            // RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Ok, message, cUser, startTime, DateTime.Now);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.Success) } });

            // return ResponseSuccess(new List<ResultResponse>() { new ResultResponse() { Message = message } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="query">query.</param>
        /// <returns>returns.</returns>
        public Response<GeoLocationResultResponse> GetPackerGeoLocationCustomer(HttpRequest request, GetPositionPackerCustomerRequest query)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (query == null)
            {
                this.RegistryLog("AppPacker", "Set PAcker Geolocation", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = query.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("AppPacker", "Set PAcker Geolocation", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GeoLocationResultResponse>(errorsMessage);
            }

            var queryt = new List<ConditionParameter>();

            queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "PartitionKey",
                    Condition = QueryComparisons.Equal,
                    Value = query.PackerId,
                },
                new ConditionParameter
                {
                    ColumnName = "ActivityId",
                    Condition = QueryComparisons.Equal,
                    Value = query.ActivityId,
                },
            };
            var result = this.geoLocation.GetListQueryAsync(queryt).Result;

            var geoLocation = new List<GeoLocationResultResponse>();
            var dControl = new DateTime(2000, 1, 1);
            result.ForEach(r =>
            {
                if (dControl < r.Timestamp.DateTime)
                {
                    dControl = r.Timestamp.DateTime;
                    geoLocation.Add(new GeoLocationResultResponse
                    {
                        Alt = (decimal)r.Altitude,
                        Lat = (decimal)r.Latitude,
                        Lon = (decimal)r.Longitude,
                        Acc = (decimal)r.Accuracy,
                        Spe = (decimal)r.Speed,
                        TSM = r.TimeStampMobile,
                        TS = r.Timestamp.DateTime,
                    });
                }

                // else {
                //    var control = "registro descartado";
                // }
            });
            return ResponseSuccess(geoLocation);

            // Se busca la información de la actividad
        }
    }
}