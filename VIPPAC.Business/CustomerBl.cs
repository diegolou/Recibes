// <copyright file="CustomerBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Http;
    using Microsoft.WindowsAzure.Storage;
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
    public class CustomerBl : BusinessBase<User>, ICustomerBl
    {
        private readonly IGenericRep<CustomerLocation> cusLoc;

        private readonly IGenericRep<Customer> customer;
        private readonly IGenericRep<CustomerPlans> custPlans;
        private readonly IGenericRep<User> userRep;

        // private readonly UserSecretSettings _UserSecretSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomerBl"/> class.
        /// </summary>
        /// <param name="userRep">userRep.</param>
        /// <param name="logRep">logRep.</param>
        /// <param name="cust">cust.</param>
        /// <param name="cusloc">cusloc.</param>
        /// <param name="cusAct">cusAct.</param>
        /// <param name="custPlans">custPlans.</param>
        public CustomerBl(
            IGenericRep<User> userRep,
            IGenericRep<Log> logRep,
            IGenericRep<Customer> cust,
            IGenericRep<CustomerLocation> cusloc,
            IGenericRep<CustomerPlans> custPlans)

        // IOptions<UserSecretSettings> options
        {
            this.userRep = userRep;
            this.logRep = logRep;

            // _settings = options?.Value;
            this.customer = cust;
            this.cusLoc = cusloc;
            this.custPlans = custPlans;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="customer">customer.</param>
        /// <returns>return.</returns>
        public Response<GetCustomerInfoResponse> GetCustomerInfo(HttpRequest request, CustomerRequest customer)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (customer == null)
            {
                this.RegistryLog("App", "Get Customer Info", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = customer.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Customer Info", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GetCustomerInfoResponse>(errorsMessage);
            }

            // Consulta la información del Customer
            var resultU = this.userRep.GetByPartitionKeyAndRowKeyAsync(customer.Profile, customer.CustomerId, FilterType.None).Result;

            if (resultU.Count == 0)
            {
                var responseId = ServiceResponseCode.ClienteNoExiste;
                this.RegistryLog("App", "Get Customer Info", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<GetCustomerInfoResponse>(responseId);
            }

            // Se consulta la información adicional del customer
            var resultIA = this.customer.GetByPartitionKeyAndRowKeyAsync(customer.Profile, customer.CustomerId, FilterType.None).Result;
            string idType = string.Empty;
            long idNumber = 0;
            long mobile = 0;
            bool retefuente = false;
            string actaReteFuente = string.Empty;
            bool reteIca = false;
            string actaReteIca = string.Empty;
            int countryCode = 0;
            bool company = false;

            if (resultIA.Count > 0)
            {
                idType = resultIA[0].IdType;
                idNumber = resultIA[0].IdNumber;
                mobile = resultIA[0].Mobile;
                retefuente = resultIA[0].Retefuente;
                actaReteFuente = resultIA[0].ActaReteFuente;
                reteIca = resultIA[0].ReteIca;
                actaReteIca = resultIA[0].ActaReteIca;
                company = resultIA[0].Company;
                countryCode = resultIA[0].CountryCode;
            }

            // Se consulta la lista de direcciones que elseñor tiene registradas
            var resultAd = this.cusLoc.GetByPatitionKeyAsync(customer.CustomerId).Result;
            var addressList = new List<AddressInfo>();
            if (resultAd.Count > 0)
            {
                resultAd.ForEach(r =>
                    {
                        addressList.Add(new AddressInfo()
                        {
                            Address = r.Address,
                            Adnumber = r.Adnumber,
                            City = r.City,
                            Country = r.Country,
                            Details = r.Details,
                            Formattedaddress = r.Formattedaddress,
                            Id = r.RowKey,
                            Instruccions = string.Empty,
                            Lat = r.Latitude,
                            Lng = r.Longitude,
                            Name = r.Name,
                            PostalCode = r.PostalCode,
                            State = r.State,
                            Type = string.Empty,
                            Valid = true,
                        });
                    });
            }

            var resultT = new List<GetCustomerInfoResponse>
            {
                new GetCustomerInfoResponse()
                {
                    IdType = idType,
                    IdNumber = idNumber,
                    CustomerId = resultU[0].RowKey,
                    AddressInfoList = addressList,
                    Email = resultU[0].RowKey,
                    FirstName = resultU[0].FirstName,
                    LastName = resultU[0].LastName,
                    Mobile = mobile,
                    Profile = resultU[0].PartitionKey,
                    Status = resultU[0].Status,
                    ActaReteFuente = actaReteFuente,
                    ActaReteIca = actaReteIca,
                    Company = company,
                    CountryCode = countryCode,
                    Retefuente = retefuente,
                    ReteIca = reteIca,
                },
            };

            string message = string.Format("The Customer {0} {1} created Correctly", customer.Profile, customer.CustomerId);
            this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Ok, message, customer, startTime, DateTime.UtcNow);
            return ResponseSuccess(resultT);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="customer">customer.</param>
        /// <returns>returns.</returns>
        public Response<CustomerPlansResponse> GetCustomerPlan(HttpRequest request, CustomerRequest customer)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (customer == null)
            {
                this.RegistryLog("App", "Get Customer Plans", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = customer.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Customer Plans", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<CustomerPlansResponse>(errorsMessage);
            }

            var result = this.custPlans.GetByPatitionKeyAsync(customer.CustomerId).Result;
            var rta = new List<CustomerPlansResponse>();
            result.ForEach(r =>
            {
                rta.Add(new CustomerPlansResponse
                {
                    Customer = r.Customer,
                    CustomerPlanId = r.CustomerPlanId,
                    PlanId = r.PlanId,
                    PlanName = r.PlanName,
                    Balance = r.Balance,
                    Currency = r.Currency,
                });
            });
            return ResponseSuccess(rta);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="user">user.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> RegistryCustomer(HttpRequest request, RegistryCustomerRequest user)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (user == null)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = user.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            // Se escribe la tabla de usuarios
            this.AddUser(user, out User cUser, out bool result, out string error);
            if (!result)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "There is already a Customer with the same Id. System error:" + error, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // se escribe la tabla de información adicional del cliente
            bool result1 = this.AddCustomerInfo(user);
            if (!result1)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "There is already a Customer with the same Id", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // se carga la información de la localización
            bool result2 = this.AddCustomerLocarion(user);
            if (!result2)
            {
                this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "There is already a Customer with the same Id", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            // Aqui se debe validar el envío del codigo de activación de la cuenta
            // bool result3 = ActivationCode(user);
            // if (!result3)
            // {
            //    RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Error, "There is already a Customer with the same Id", string.Empty, startTime, DateTime.Now);
            //    return ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            // }
            string message = string.Format("The Customer {0} {1} created Correctly", user.FirstName, user.LastName);
            this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Ok, message, cUser, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.UserCreatedOk) } });

            // return ResponseSuccess(new List<ResultResponse>() { new ResultResponse() { Message = message } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="custPlan">custPlan.</param>
        /// <returns>retuns.</returns>
        public Response<ResultResponse> SetCustomerPlan(HttpRequest request, CustomerPlanRequest custPlan)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (custPlan == null)
            {
                this.RegistryLog("App", "Set Customer Plans", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = custPlan.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Set Customer Plans", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            // Se debe validar que exista el cliente.
            var result = this.customer.GetByPartitionKeyAndRowKeyAsync("customer", custPlan.CustomerId).Result;

            if (result.Count == 0)
            {
                this.RegistryLog("App", "Set Customer Plans", Utils.Enum.StateLog.Error, "customer not exist on Recibes", string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.CustomerNotExist);
            }

            string message = string.Empty;
            this.RegistryLog("App", "Registry Customer", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.UserCreatedOk) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="customer">customer.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> UpdateCustomer(HttpRequest request, UpdateCustomerRequest customer)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (customer == null)
            {
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = customer.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<ResultResponse>(errorsMessage);
            }

            // Actualizar la información de la tabla user
            var resultUser = this.userRep.GetByPartitionKeyAndRowKeyAsync(customer.Profile, customer.Email).Result;
            if (resultUser.Count == 0)
            {
                var responseId = ServiceResponseCode.ClienteNoExiste;
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(responseId);
            }

            // Actualizar tabla User
            resultUser[0].FirstName = customer.FirstName;
            resultUser[0].LastName = customer.LastName;
            if (!this.userRep.AddOrUpdate(resultUser[0]).Result)
            {
                var responseId = ServiceResponseCode.NotUpdateCustomerinformation;
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(responseId);
            }

            // Actualizar tabla Customer
            var resultCustomer = this.customer.GetByPartitionKeyAndRowKeyAsync(customer.Profile, customer.Email).Result;
            var tCustomer = new Customer();
            if (resultCustomer.Count == 0)
            {
                tCustomer.PartitionKey = customer.Profile;
                tCustomer.RowKey = customer.Email;
            }
            else
            {
                tCustomer.PartitionKey = resultCustomer[0].PartitionKey;
                tCustomer.RowKey = resultCustomer[0].RowKey;
            }

            tCustomer.CountryCode = customer.CountryCode;
            tCustomer.Mobile = customer.Mobile;
            tCustomer.IdType = customer.IdType;
            tCustomer.IdNumber = customer.IdNumber;
            tCustomer.Retefuente = customer.ReteFuente;
            tCustomer.ReteIca = customer.ReteIca;
            tCustomer.ActaReteFuente = customer.ActaReteFuente;
            tCustomer.ActaReteIca = customer.ActaReteIca;

            if (!this.customer.AddOrUpdate(tCustomer).Result)
            {
                var responseId = ServiceResponseCode.NotUpdateCustomerinformation;
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(responseId);
            }

            // Actualizar dirección del cliente.
            var resultCl = this.cusLoc.GetByPartitionKeyAndRowKeyAsync(customer.Email, customer.AddressesInfo.Id).Result;
            var custloc = new CustomerLocation();
            if (resultCl.Count > 0)
            {
                custloc = resultCl[0];
            }
            else
            {
                custloc.RowKey = Guid.NewGuid().ToString();
            }

            custloc.Address = customer.AddressesInfo.Address;
            custloc.Adnumber = customer.AddressesInfo.Adnumber;
            custloc.City = customer.AddressesInfo.City;
            custloc.Country = customer.AddressesInfo.Country;
            custloc.PartitionKey = customer.Email;
            custloc.Details = customer.AddressesInfo.Details;
            custloc.Latitude = customer.AddressesInfo.Lat;
            custloc.Longitude = customer.AddressesInfo.Lng;
            custloc.Name = "Principal";
            custloc.State = customer.AddressesInfo.State;
            custloc.PostalCode = customer.AddressesInfo.PostalCode;
            custloc.Formattedaddress = customer.AddressesInfo.Formattedaddress;
            if (!this.cusLoc.AddOrUpdate(custloc).Result)
            {
                var responseId = ServiceResponseCode.NotUpdateCustomerinformation;
                this.RegistryLog("App", "Update Customer", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(responseId);
            }

            string message = string.Format("The Customer {0} {1} Update Correctly", customer.FirstName, customer.LastName);
            this.RegistryLog("App", "Update Customerr", Utils.Enum.StateLog.Ok, message, null, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.UserCreatedOk) } });
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="user">user.</param>
        /// <returns>returns.</returns>
        // private bool ActivationCode(RegistryCustomerRequest user)
        // {
        //    var code = Utils.Helpers.CodeGenerator.GetCode(6);
        //    var cAct = new CustomerActivation()
        //    {
        //        PartitionKey = user.Email,
        //        RowKey = code,
        //        CodeExpires = DateTime.UtcNow.AddMinutes(20),
        //    };
        //    var result3 = this.cusAct.Add(cAct).Result;
        //    return result3;
        // }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="user">user.</param>
        /// <returns>returns.</returns>
        private bool AddCustomerInfo(RegistryCustomerRequest user)
        {
            var cCustomer = new Customer()
            {
                PartitionKey = "customer",
                RowKey = user.Email,
                Terms = user.Terms,
                Mobile = user.Mobile,
                ActaReteFuente = user.ActaReteFuente,
                ActaReteIca = user.ActaReteIca,
                Company = user.Company,
                CountryCode = user.CountryCode,
                IdNumber = user.IdNumber,
                IdType = user.IdType,
                Retefuente = user.ReteFuente,
                ReteIca = user.ReteIca,
            };
            var result1 = this.customer.Add(cCustomer).Result;
            return result1;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="user">user.</param>
        /// <returns>returns.</returns>
        private bool AddCustomerLocarion(RegistryCustomerRequest user)
        {
            var cuslog = new CustomerLocation()
            {
                Address = user.AddressesInfo.Address,
                Adnumber = user.AddressesInfo.Adnumber,
                City = user.AddressesInfo.City,
                Country = user.AddressesInfo.Country,
                PartitionKey = user.Email,
                Details = user.AddressesInfo.Details,
                RowKey = Guid.NewGuid().ToString(),
                Latitude = user.AddressesInfo.Lat,
                Longitude = user.AddressesInfo.Lng,
                Name = "Principal",
                State = user.AddressesInfo.State,
                PostalCode = user.AddressesInfo.PostalCode,
                Formattedaddress = user.AddressesInfo.Formattedaddress,
            };
            var result2 = this.cusLoc.Add(cuslog).Result;
            return result2;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="user">user.</param>
        /// <param name="cUser">cUser.</param>
        /// <param name="result">result.</param>
        private void AddUser(RegistryCustomerRequest user, out User cUser, out bool result, out string error)
        {
            error = string.Empty;
            try
            {
                cUser = new User()
                {
                    PartitionKey = "customer",
                    RowKey = user.Email,
                    Profile = user.Profile,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Attempts = 0,
                    Password = user.Password,
                    Status = "preactive",
                };
                result = this.userRep.Add(cUser).Result;
            }
            catch (StorageException ex)
            {
                cUser = null;
                error = ex.Message;
                result = false;
            }
            catch (Exception ex)
            {
                cUser = null;
                error = ex.Message;
                result = false;
            }
        }

        // public string GetContainerSasUri(string containerName, string BlobName)
        // {
        //    var StorageConnectionString = _settings.TableStorage;
        //    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(StorageConnectionString);

        // //Create the blob client object.
        //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        // //Get a reference to a container to use for the sample code, and create it if it does not exist.
        //    CloudBlobContainer container = blobClient.GetContainerReference(containerName);
        //    CloudBlockBlob blob = container.GetBlockBlobReference(BlobName);

        // //Set the expiry time and permissions for the blob.
        //    //In this case, the start time is specified as a few minutes in the past, to mitigate clock skew.
        //    //The shared access signature will be valid immediately.
        //    SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
        //    sasConstraints.SharedAccessStartTime = DateTimeOffset.UtcNow.AddMinutes(-5);
        //    sasConstraints.SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddHours(1);
        //    sasConstraints.Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write;

        // //Generate the shared access signature on the blob, setting the constraints directly on the signature.
        //    string sasBlobToken = blob.GetSharedAccessSignature(sasConstraints);

        // //Return the URI string for the container, including the SAS token.
        //    return blob.Uri + sasBlobToken;
        // }
        /// <summary>
        ///
        /// </summary>
        /// <param name="size"></param>
        /// <returns></returns>
        // private string CodeGenerator(int size)
        // {
        //    string numbers = "0123456789";
        //    Random random = new Random();
        //    StringBuilder builder = new StringBuilder(size);

        // for (var i = 0; i < 6; i++)
        //    {
        //        builder.Append(numbers[random.Next(0, numbers.Length)]);
        //    }
        //    return builder.ToString();
        // }
    }
}