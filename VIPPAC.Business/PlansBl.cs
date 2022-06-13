// <copyright file="PlansBl.cs" company="PlaceholderCompany">
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
    using VIPPAC.Utils.Enum;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// .
    /// </summary>
    public class PlansBl : BusinessBase<Plans>, IPlansBl
    {
        private readonly IGenericRep<CustomerPlans> custPlan;
        private readonly IGenericRep<Plans> plans;
        private readonly IGenericRep<PrivatePlansCustomer> privatePlansCustomer;

        /// <summary>
        /// Initializes a new instance of the <see cref="PlansBl"/> class.
        /// </summary>
        /// <param name="plans">plans.</param>
        /// <param name="privatePlansCustomer">privatePlansCustomer.</param>
        /// <param name="custPlan">custPlan.</param>
        public PlansBl(IGenericRep<Plans> plans, IGenericRep<PrivatePlansCustomer> privatePlansCustomer, IGenericRep<CustomerPlans> custPlan)
        {
            this.plans = plans;
            this.privatePlansCustomer = privatePlansCustomer;
            this.custPlan = custPlan;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="cp">cp.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> AdminCustomersPrivstePlans(HttpRequest request, AdminCustomerPrivatePlansRequest cp)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (cp == null)
            {
                this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = cp.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            cp.CustomerList.ForEach(r =>
            {
                this.privatePlansCustomer.AddOrUpdate(new PrivatePlansCustomer { PartitionKey = cp.PlanId, RowKey = r.CustomerId });
            });

            string message = $"The customers associated with the {cp.PlanId} plan were updated";
            this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.Success) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="cp">cp.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> DeleteCustomersPrivstePlans(HttpRequest request, AdminCustomerPrivatePlansRequest cp)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (cp == null)
            {
                this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = cp.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            cp.CustomerList.ForEach(r =>
            {
                this.privatePlansCustomer.DeleteRowAsync(new PrivatePlansCustomer { PartitionKey = cp.PlanId, RowKey = r.CustomerId });
            });

            string message = $"The customers associated with the {cp.PlanId} plan were updated";
            this.RegistryLog("App", "Admin Customers Private Planes", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.Success) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="idCountry">idCountry.</param>
        /// <param name="idPlan">idPlan.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> DeletePlans(HttpRequest request, string idCountry, string idPlan)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (idPlan == string.Empty || idCountry == string.Empty)
            {
                this.RegistryLog("App", "Delete Plans", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            // Se debe validar que no haya ningun plan asignado algun cliente
            var queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "PlanId",
                    Condition = QueryComparisons.Equal,
                    Value = idPlan,
                },
            };
            if (this.custPlan.GetListQueryAsync(queryt).Result.Count > 0)
            {
                this.RegistryLog("App", "Delete Plans", Utils.Enum.StateLog.Error, $"The plan {idPlan} can't be deleted because it is associated with one or more clients", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ErrorGeneral);
            }

            var resultc = this.plans.GetByPartitionKeyAndRowKeyAsync(idCountry, idPlan, FilterType.None).Result;

            if (resultc.Count == 0)
            {
                this.RegistryLog("App", "Delete Plans", Utils.Enum.StateLog.Error, $"not exist plan with id {idPlan}", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.ErrorGeneral);
            }

            var result = this.plans.DeleteRowAsync(resultc[0]).Result;

            if (!result)
            {
                this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Error, $"Can't delete plan with id {idPlan}", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // string message = string.Format("The Customer {0} {1} Update Correctly", customer.FirstName, customer.LastName);
            string message = $"Plan with Id {idPlan} was successfully removed";
            this.RegistryLog("App", "Delete Plans", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.PlanDeleteOk) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<PlansResponse> GetPlans()
        {
            List<PlansResponse> resultPlans = this.GetPlansInternal();
            return ResponseSuccess(resultPlans.FindAll(r => r.Public));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<PlansResponse> GetPlansActive()
        {
            List<PlansResponse> resultPlans = this.GetPlansInternal();
            return ResponseSuccess(resultPlans.FindAll(r => r.Public && r.Active));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<PlansResponse> GetPlansAdmin()
        {
            List<PlansResponse> resultPlans = this.GetPlansInternal();
            return ResponseSuccess(resultPlans);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="country">country.</param>
        /// <returns>returns.</returns>
        public Response<PlansResponse> GetPlansbyCountries(string country)
        {
            List<PlansResponse> resultPlans = this.GetPlansInternal();
            return ResponseSuccess(resultPlans.FindAll(r => r.Public && r.Country == country));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="plans">plans.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> SetPlans(HttpRequest request, SetPlansRequest plans)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (plans == null)
            {
                this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = plans.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            var planId = Guid.NewGuid().ToString();

            // se crea el codigo del nuevo plan
            var result = this.plans.Add(new Plans
            {
                RowKey = planId,
                PartitionKey = plans.Country,
                Currency = plans.Currency,
                Description = plans.Description,
                Discount = plans.Discount,
                Name = plans.Name,
                Value = plans.Value,
                Public = plans.Public,
                Active = plans.Active,
            }).Result;

            if (!result)
            {
                this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Error, "There is already a Plan with the same Id", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // se valida si el plan es privado para poder guardar los Customer Id
            plans.CustomerList.ForEach(r =>
            {
                this.privatePlansCustomer.AddOrUpdate(new PrivatePlansCustomer { RowKey = r.CustomerId, PartitionKey = planId });
            });

            // string message = string.Format("The Customer {0} {1} Update Correctly", customer.FirstName, customer.LastName);
            string message = $"Be created the plan with name {plans.Name} for the country {plans.Country}";
            this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.PlanCreateOK) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="plans">plans.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> UpdatePlans(HttpRequest request, PlansRequest plans)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (plans == null)
            {
                this.RegistryLog("App", "Update Plans", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = plans.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update Plans", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            // se crea el codigo del nuevo plan
            var result = this.plans.AddOrUpdate(new Plans
            {
                RowKey = plans.Code,
                PartitionKey = plans.Country,
                Currency = plans.Currency,
                Description = plans.Description,
                Discount = plans.Discount,
                Name = plans.Name,
                Value = plans.Value,
                Public = plans.Public,
                Active = plans.Active,
            }).Result;

            if (!result)
            {
                this.RegistryLog("App", "Set Plans", Utils.Enum.StateLog.Error, "There is already a Plan with the same Id", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // se valida si el plan es privado para poder guardar los Customer Id
            plans.CustomerList.ForEach(r =>
            {
                this.privatePlansCustomer.AddOrUpdate(new PrivatePlansCustomer { RowKey = r.CustomerId, PartitionKey = plans.Code });
            });

            // string message = string.Format("The Customer {0} {1} Update Correctly", customer.FirstName, customer.LastName);
            string message = $"Be update the plan with name {plans.Name} for the country {plans.Country}";
            this.RegistryLog("App", "Update Plans", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.PlanUpdateOk) } });
        }

        /// <summary>
        /// Función que se encarga de traer todos los planes registros en el sistema.
        /// </summary>
        /// <returns>Lista completa de planes.</returns>
        private List<PlansResponse> GetPlansInternal()
        {
            var resultPlans = new List<PlansResponse>();

            var result = this.plans.GetListAsync().Result;

            result.ForEach(r =>
            {
                resultPlans.Add(new PlansResponse
                {
                    Code = r.Code,
                    Name = r.Name,
                    Value = r.Value,
                    Description = r.Description,
                    Discount = r.Discount,
                    Country = r.Country,
                    Currency = r.Currency,
                    Public = r.Public,
                    Active = r.Active,
                });
            });
            return resultPlans;
        }
    }
}