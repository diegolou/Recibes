// <copyright file="SecurityBl.cs" company="PlaceholderCompany">
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
    public class SecurityBl : BusinessBase<User>, ISecurityBl
    {
        private readonly IGenericRep<CustomerActivation> cusAct;

        /// <summary>
        /// User repository.
        /// </summary>
        private readonly IGenericRep<User> userRep;

        /// <summary>
        /// Initializes a new instance of the <see cref="SecurityBl"/> class.
        /// </summary>
        /// <param name="userRep">userRep.</param>
        /// <param name="logRep">logRep.</param>
        /// <param name="cusAct">cusAct.</param>
        public SecurityBl(IGenericRep<User> userRep, IGenericRep<Log> logRep, IGenericRep<CustomerActivation> cusAct)
        {
            this.userRep = userRep;
            this.cusAct = cusAct;
            this.logRep = logRep;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="userReq">userReq.</param>
        /// <returns>returns.</returns>
        public Response<ActivationCodeResponse> ActivationCode(HttpRequest request, CustomerRequest userReq)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (userReq == null)
            {
                this.RegistryLog("App", "Activation Code", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = userReq.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Activation Code", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ActivationCodeResponse>(errorsMessage);
            }

            var result = this.ActivationCode(string.Format("{0}-{1}", userReq.Profile, userReq.CustomerId), out string code);

            if (!result)
            {
                this.RegistryLog("App", "Activation Code", Utils.Enum.StateLog.Error, "There is already a Customer with the same Id", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ActivationCodeResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            var resultList = new List<ActivationCodeResponse>
            {
                new ActivationCodeResponse { ActivationCode = code, CustomerId = userReq.CustomerId, Profile = userReq.Profile },
            };

            return ResponseSuccess(resultList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="userReq">userReq.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> ActivationUser(HttpRequest request, ActivationUserRequest userReq)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (userReq == null)
            {
                this.RegistryLog("App", "Activate Customer", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = userReq.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Activate Customer", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "PartitionKey",
                    Condition = QueryComparisons.Equal,
                    Value = string.Format("{0}-{1}", userReq.Profile, userReq.CustomerId),
                },
            };

            queryt.Add(new ConditionParameter
            {
                ColumnName = "RowKey",
                Condition = QueryComparisons.Equal,
                Value = userReq.AcivationCode,
            });

            queryt.Add(new ConditionParameter
            {
                ColumnName = "CodeExpires",
                Condition = QueryComparisons.GreaterThanOrEqual,
                ValueDateTime = DateTime.UtcNow,
            });

            queryt.Add(new ConditionParameter
            {
                ColumnName = "Used",
                Condition = QueryComparisons.Equal,
                ValueBool = false,
            });
            var result = this.cusAct.GetListQueryAsync(queryt).Result;
            if (result == null || result.Count == 0)
            {
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ActivationCodeExpired);
            }

            result[0].Used = true;
            _ = this.cusAct.AddOrUpdate(result[0]).Result;

            // Se debe actualizar el estado del cliente.
            var resultUser = this.userRep.GetByPartitionKeyAndRowKeyAsync(userReq.Profile, userReq.CustomerId).Result;
            if (resultUser == null || resultUser.Count == 0)
            {
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserNotFound);
            }

            resultUser[0].Status = "active";
            _ = this.userRep.AddOrUpdate(resultUser[0]).Result;

            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.UserActivateOk) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="userReq">userReq.</param>
        /// <returns>returns.</returns>
        public Response<AuthenticateUserResponse> AuthenticateUser(HttpRequest request, AuthenticateUserRequest userReq)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (userReq == null)
            {
                this.RegistryLog("App", "Login User", Utils.Enum.StateLog.Error, "Valores Nulos", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = userReq.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Login User", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<AuthenticateUserResponse>(errorsMessage);
            }

            var result = this.userRep.GetByPartitionKeyAndRowKeyAsync(userReq.Origin, userReq.Email).Result;

            ServiceResponseCode responseId;
            if (result == null || result.Count == 0 || result[0].Attempts > 2 || result[0].Password != userReq.Password)
            {
                responseId = ServiceResponseCode.UserNotFound;

                if (result.Count > 0)
                {
                    if (result[0].Attempts < 3)
                    {
                        result[0].Attempts++;
                        this.userRep.AddOrUpdate(result[0]);
                    }
                    else
                    {
                        responseId = ServiceResponseCode.FailedAttempts;
                    }
                }

                this.RegistryLog("App", "Login User", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<AuthenticateUserResponse>(responseId);
            }

            result[0].Attempts = 0;
            this.userRep.AddOrUpdate(result[0]);
            var response = new List<AuthenticateUserResponse>()
            {
                new AuthenticateUserResponse()
                {
                    UserInfo = new UserResponse()
                    {
                        Email = result[0].Email,
                        FirstName = result[0].FirstName,
                        LastName = result[0].LastName,
                        Profile = result[0].Profile,
                        Status = result[0].Status,
                    },
                    AuthInfo = this.GetAuthenticationToken(),
                },
            };
            string message = string.Format("The User {0} {1}  Login Correctly in the system ", response[0].UserInfo.FirstName, response[0].UserInfo.LastName, userReq.Origin);
            this.RegistryLog("App", "Login User", Utils.Enum.StateLog.Ok, message, userReq, startTime, DateTime.UtcNow);
            return ResponseSuccess(response);
        }

        private bool ActivationCode(string customerId, out string code)
        {
            code = VIPPAC.Utils.Helpers.CodeGenerator.GetCode(6);
            var cAct = new CustomerActivation()
            {
                PartitionKey = customerId,
                RowKey = code,
                CodeExpires = DateTime.UtcNow.AddMinutes(20),
            };
            var result3 = this.cusAct.Add(cAct).Result;
            return result3;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>Returns.</returns>
        private AuthenticationToken GetAuthenticationToken()
        {
            return new AuthenticationToken()
            {
                AccessToken = string.Empty,
                Expiration = DateTime.Now.AddHours(1),
                TokenType = string.Empty,
            };
        }
    }
}