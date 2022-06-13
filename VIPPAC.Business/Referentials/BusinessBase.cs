// <copyright file="BusinessBase.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business.Referentials
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Text;
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Tables;
    using VIPPAC.Utils.Enum;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// base class to business.
    /// </summary>
    /// <typeparam name="T">.</typeparam>
    public class BusinessBase<T>
        where T : class, new()
    {
        /// <summary>
        /// The response business.
        /// </summary>
        protected Response<T> responseBusiness;

        /// <summary>
        /// Log Id.
        /// </summary>
        protected IGenericRep<Log> logRep;

        /// <summary>
        /// Get Request.
        /// </summary>
        protected HttpRequest request;

        /// <summary>
        /// Initializes a new instance of the <see cref="BusinessBase{T}"/> class.
        /// </summary>
        public BusinessBase()
        {
            this.responseBusiness = new Response<T>
            {
                CodeResponse = 0,
                TransactionMade = false,
                Message = new List<string>(),
                Data = new List<T>(),
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <param name="entity">entity.</param>
        /// <returns>return.</returns>
        public static Response<TEntity> ResponseSuccess<TEntity>(IList<TEntity> entity)
            where TEntity : class, new()
        {
            return new Response<TEntity>
            {
                CodeResponse = (int)ServiceResponseCode.Success,
                TransactionMade = true,
                Message = new List<string> { ResponseMessageHelper.GetParameter(ServiceResponseCode.Success) },
                Data = entity,
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="any">any.</param>
        /// <returns>return.</returns>
        public static Response<List<string>> ResponseSuccessList(List<List<string>> any)
        {
            return new Response<List<string>>
            {
                CodeResponse = (int)ServiceResponseCode.Success,
                TransactionMade = true,
                Message = new List<string> { ResponseMessageHelper.GetParameter(ServiceResponseCode.Success) },
                Data = any,
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <returns>return.</returns>
        public static Response<TEntity> ResponseFail<TEntity>()
            where TEntity : class, new()
        {
            return new Response<TEntity>
            {
                CodeResponse = (int)ServiceResponseCode.InternalError,
                TransactionMade = false,
                Message = new List<string>
                {
                    ResponseMessageHelper.GetParameter(ServiceResponseCode.InternalError),
                },
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <returns>returns.</returns>
        public static Response<TEntity> ResponseNotFound<TEntity>()
            where TEntity : class, new()
        {
            return new Response<TEntity>
            {
                CodeResponse = (int)ServiceResponseCode.NotFound,
                TransactionMade = false,
                Message = new List<string>
                {
                    ResponseMessageHelper.GetParameter(ServiceResponseCode.NotFound),
                },
            };
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity.</typeparam>
        /// <param name="messages">The messages.</param>
        /// <returns>return.</returns>
        public static Response<TEntity> ResponseFail<TEntity>(IList<string> messages)
            where TEntity : class, new()
        {
            var delimiter = Environment.NewLine;
            return new Response<TEntity>
            {
                CodeResponse = (int)ServiceResponseCode.InternalError,
                TransactionMade = false,
                Message = new List<string>
                {
                    messages.Aggregate((i, j) => string.Concat(i, delimiter, j)),
                },
            };
        }

        /// <summary>
        /// Responses the success.
        /// </summary>
        /// <param name="ratevalue">ratevalue.</param>
        /// <returns>return.</returns>
        public Response<T> ResponseSuccess(Entities.Responses.RateValue ratevalue)
        {
            this.responseBusiness.TransactionMade = true;
            this.responseBusiness.CodeResponse = (int)ServiceResponseCode.Success;
            this.responseBusiness.Message.Add(ResponseMessageHelper.GetParameter(ServiceResponseCode.Success));
            return this.responseBusiness;
        }

        /// <summary>
        /// Responses the success.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <returns>return.</returns>
        public Response<T> ResponseSuccess(ServiceResponseCode code)
        {
            this.responseBusiness.TransactionMade = true;
            this.responseBusiness.CodeResponse = (int)code;
            this.responseBusiness.Message.Add(ResponseMessageHelper.GetParameter(code));
            return this.responseBusiness;
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <returns>return.</returns>
        public Response<T> ResponseFail()
        {
            this.responseBusiness.TransactionMade = false;
            this.responseBusiness.CodeResponse = (int)ServiceResponseCode.InternalError;
            this.responseBusiness.Message.Add(ResponseMessageHelper.GetParameter(ServiceResponseCode.InternalError));
            return this.responseBusiness;
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <returns>return.</returns>
        public Response<T> ResponseFail(ServiceResponseCode code)
        {
            this.responseBusiness.TransactionMade = false;
            this.responseBusiness.CodeResponse = (int)code;
            this.responseBusiness.Message.Add(ResponseMessageHelper.GetParameter(code));
            return this.responseBusiness;
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <param name="messages">The message.</param>
        /// <returns>return.</returns>
        public Response<T> ResponseFail(ServiceResponseCode code, IList<string> messages)
        {
            this.responseBusiness.TransactionMade = false;
            this.responseBusiness.CodeResponse = (int)code;
            this.responseBusiness.Message = messages;
            return this.responseBusiness;
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <param name="messages">The message.</param>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <returns>return.</returns>
        public Response<TEntity> ResponseBadRequest<TEntity>(IList<string> messages)
            where TEntity : class, new()
        {
            var delimiter = Environment.NewLine;
            return new Response<TEntity>
            {
                CodeResponse = (int)ServiceResponseCode.BadRequest,
                TransactionMade = false,
                Message = new List<string>
                {
                    string.Format(CultureInfo.CurrentCulture, ResponseMessageHelper.GetParameter(ServiceResponseCode.BadRequest), delimiter, messages.Aggregate((i, j) => string.Concat(i, delimiter, j))),
                },
            };
        }

        /// <summary>
        /// Responses the fail.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <returns>return.</returns>
        public Response<TEntity> ResponseFail<TEntity>(ServiceResponseCode code)
            where TEntity : class, new()
        {
            return new Response<TEntity>
            {
                CodeResponse = (int)code,
                TransactionMade = false,
                Message = new List<string>
                {
                    ResponseMessageHelper.GetParameter(code),
                },
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <typeparam name="TEntity">TEntity.</typeparam>
        /// <param name="codError">codError.</param>
        /// <param name="error">error.</param>
        /// <returns>return.</returns>
        public Response<TEntity> ResponseFail<TEntity>(int codError, string error)
            where TEntity : class, new()
        {
            return new Response<TEntity>
            {
                CodeResponse = codError,
                TransactionMade = false,
                Message = new List<string>
                {
                    error,
                },
            };
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="typeLog">typeLog.</param>
        /// <param name="transaction">transaction.</param>
        /// <param name="state">state.</param>
        /// <param name="observations">observations.</param>
        /// <param name="transactionDetails">transactionDetails.</param>
        /// <param name="startTime">startTime.</param>
        /// <param name="endTime">endTime.</param>
        /// <returns>returns.</returns>
        public string RegistryLog(string typeLog, string transaction, StateLog state, List<string> observations, string transactionDetails, DateTime startTime, DateTime endTime)
        {
            string separator = string.Empty;
            string obs = string.Empty;

            foreach (string objItem in observations)
            {
                obs += separator + objItem;
                if (string.IsNullOrEmpty(separator))
                {
                    separator = "|";
                }
            }

            return this.RegistryLog(typeLog, transaction, state, obs, transactionDetails, startTime, endTime);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="typeLog">typeLog.</param>
        /// <param name="transaction">transaction.</param>
        /// <param name="state">state.</param>
        /// <param name="observations">observations.</param>
        /// <param name="transactionDetails">transactionDetails.</param>
        /// <param name="startTime">startTime.</param>
        /// <param name="endTime">endTime.</param>
        /// <returns>returns.</returns>
        public string RegistryLog(string typeLog, string transaction, StateLog state, string observations, string transactionDetails, DateTime startTime, DateTime endTime)
        {
            string idlog = Guid.NewGuid().ToString();
            Log infoLog = new Log()
            {
                Transaction = transaction,
                LogType = typeLog,
                LogId = idlog,
                State = (int)state,
                Observations = observations,
                TransactionDetails = transactionDetails,
                StartTime = startTime,
                EndTime = endTime,
                RemoteIpAdress = this.GetRemoteIPAdress(),
            };
            _ = this.logRep.Add(infoLog).Result;
            return idlog;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="typeLog">typeLog.</param>
        /// <param name="transaction">transaction.</param>
        /// <param name="state">state.</param>
        /// <param name="observations">observations.</param>
        /// <param name="transactionDetails">transactionDetails.</param>
        /// <param name="startTime">startTime.</param>
        /// <param name="endTime">endTime.</param>
        /// <returns>returns.</returns>
        public string RegistryLog(string typeLog, string transaction, StateLog state, string observations, object transactionDetails, DateTime startTime, DateTime endTime)
        {
            return this.RegistryLog(typeLog, transaction, state, observations, this.GetTransactionDetails(transactionDetails), startTime, endTime);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="transactionDetails">transactionDetails.</param>
        /// <returns>returns.</returns>
        private string GetTransactionDetails(object transactionDetails)
        {
            string separator = string.Empty;
            StringBuilder info = new StringBuilder();
            foreach (var item in transactionDetails.GetType().GetMembers())
            {
                if (item.MemberType == System.Reflection.MemberTypes.Property)
                {
                    if (transactionDetails.GetType().GetProperty(item.Name) != null)
                    {
                        info.AppendFormat("{0}{1}={2}", separator, item.Name, transactionDetails.GetType().GetProperty(item.Name).GetValue(transactionDetails, null));
                        if (string.IsNullOrEmpty(separator))
                        {
                            separator = "|";
                        }
                    }
                }
                else if (item.MemberType == System.Reflection.MemberTypes.Field)
                {
                    info.AppendFormat("{0}{1}={2}", separator, item.Name, transactionDetails.GetType().GetProperty(item.Name).GetValue(transactionDetails, null));
                    if (string.IsNullOrEmpty(separator))
                    {
                        separator = "|";
                    }
                }
            }

            return info.ToString();
        }

        /// <summary>
        /// Funcion que retorna la dirección IP del que consume el llamado de los servicios.
        /// </summary>
        /// <returns>Direccion Ip Remota.</returns>
        private string GetRemoteIPAdress()
        {
            string result = string.Empty;
            if (this.request != null)
            {
                IPAddress remoteIpAddress = this.request.HttpContext.Connection.RemoteIpAddress;

                if (remoteIpAddress != null)
                {
                    // If we got an IPV6 address, then we need to ask the network for the IPV4 address
                    // This usually only happens when the browser is on the same machine as the server.
                    if (remoteIpAddress.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                    {
                        remoteIpAddress = System.Net.Dns.GetHostEntry(remoteIpAddress).AddressList
                            .First(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
                    }

                    result = remoteIpAddress.ToString();
                }
            }

            return result;
        }
    }
}