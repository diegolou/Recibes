// <copyright file="PackageBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Options;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;
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
    public class PackageBl : BusinessBase<RegPackage>, IPackageBl
    {
        private readonly IGenericRep<Packer> packer;
        private readonly IGenericRep<Payment> payment;
        private readonly IGenericRep<PaymentDetail> paymentDetail;
        private readonly IGenericRep<RegPackageAddress> regPackageAddress;
        private readonly IGenericRep<RegPackage> regPackageRep;
        private readonly IGenericRep<User> user;
        private readonly UserSecretSettings userSecretSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="PackageBl"/> class.
        /// </summary>
        /// <param name="regPackageRep">regPackageRep.</param>
        /// <param name="resPackageAddress">resPackageAddress.</param>
        /// <param name="user">user.</param>
        /// <param name="packer">packer.</param>
        /// <param name="logRep">logRep.</param>
        /// <param name="paymentDetail">paymentDetail.</param>
        /// <param name="payment">payment.</param>
        /// <param name="options">options.</param>
        public PackageBl(
            IGenericRep<RegPackage> regPackageRep,
            IGenericRep<RegPackageAddress> resPackageAddress,
            IGenericRep<User> user,
            IGenericRep<Packer> packer,
            IGenericRep<Log> logRep,
            IGenericRep<PaymentDetail> paymentDetail,
            IGenericRep<Payment> payment,
            IOptions<UserSecretSettings> options)
        {
            if (options == null)
            {
                throw new ArgumentNullException("options");
            }

            this.regPackageRep = regPackageRep;
            this.regPackageAddress = resPackageAddress;
            this.paymentDetail = paymentDetail;
            this.payment = payment;
            this.user = user;
            this.packer = packer;
            this.logRep = logRep;
            this.userSecretSettings = options.Value;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="activity">activity.</param>
        /// <returns>returns.</returns>
        public Response<GetActivityDetailResponse> GetActivityDetail(HttpRequest request, GetActivityDetailRequest activity)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (activity == null)
            {
                this.RegistryLog("App", "Get Activity Details", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("CustomerPackageStatusRequest");
            }

            var errorsMessage = activity.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Activity Details", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
            }

            // se debe consultar la información del paquete
            var resultp = this.regPackageRep.GetAsync(activity.ActivityId).Result;

            if (resultp == null)
            {
                var responseId = ServiceResponseCode.ErrorGeneral;
                this.RegistryLog("App", "Get Activity Details", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<GetActivityDetailResponse>(responseId);
            }

            var result = this.regPackageAddress.GetByPatitionKeyAsync(activity.ActivityId).Result;

            if (result == null || result.Count == 0)
            {
                var responseId = ServiceResponseCode.ErrorGeneral;
                this.RegistryLog("App", "Get Activity Details", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<GetActivityDetailResponse>(responseId);
            }

            var addressInfoList = new List<AddressInfo>();
            result.ForEach(r =>
            {
                addressInfoList.Add(new AddressInfo
                {
                    Address = r.Address,
                    Adnumber = r.Adnumber,
                    City = r.City,
                    Country = r.Country,
                    Details = r.Details,
                    Lat = r.Latitude,
                    Lng = r.Longitude,
                    State = r.State,
                    Type = r.Type,
                    Formattedaddress = r.Formattedaddress,
                    Instruccions = r.Instruccions,
                    PostalCode = r.PostalCode,
                    Valid = true,
                    Id = r.Id,
                    ExecutionDate = r.ExecutionDate,
                    Status = r.Status,
                    Remarks = r.Remarks,
                    UrlImage = r.HasImage ? this.GetContainerSasUri("activitypackages", string.Format("{0}/{1}.jpg", r.PartitionKey, r.RowKey)) : string.Empty,
                });
            });
            var resultList = new List<GetActivityDetailResponse>
            {
                new GetActivityDetailResponse
                {
                    ActivityID = activity.ActivityId,
                    AddressInfoList = addressInfoList,
                    Packer = this.GetPackerInfo(resultp.PackerID, true),
                    CreateDate = resultp.CreateDate,
                    PackerAssigDate = resultp.PackerAssigDate,
                },
            };

            return ResponseSuccess(resultList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="containerName">containerName.</param>
        /// <param name="blobName">BlobName.</param>
        /// <returns>returns.</returns>
        public string GetContainerSasUri(string containerName, string blobName)
        {
            var storageConnectionString = this.userSecretSettings.TableStorage;
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the blob client object.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Get a reference to a container to use for the sample code, and create it if it does not exist.
            CloudBlobContainer container = blobClient.GetContainerReference(containerName);
            CloudBlockBlob blob = container.GetBlockBlobReference(blobName);

            // Set the expiry time and permissions for the blob.
            // In this case, the start time is specified as a few minutes in the past, to mitigate clock skew.
            // The shared access signature will be valid immediately.
            SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy
            {
                SharedAccessStartTime = DateTimeOffset.UtcNow.AddMinutes(-5),
                SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddHours(1),
                Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write,
            };

            // Generate the shared access signature on the blob, setting the constraints directly on the signature.
            string sasBlobToken = blob.GetSharedAccessSignature(sasConstraints);

            // Return the URI string for the container, including the SAS token.
            return blob.Uri + sasBlobToken;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="status">status.</param>
        /// <returns>returns.</returns>
        public Response<PackageStatusResponse> GetCustomerPackageStatus(HttpRequest request, CustomerPackageStatusRequest status)
        {
            // Validar intergridad de la información ingresada
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (status == null)
            {
                this.RegistryLog("App", "Get Status Package", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("CustomerPackageStatusRequest");
            }

            var errorsMessage = status.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Status Package", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
            }

            // se define que tipo de paquete quiere consultar el customer
            var queryt = new List<ConditionParameter>();

            queryt = new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "PartitionKey",
                    Condition = QueryComparisons.Equal,
                    Value = status.CustomerId,
                },
            };
            if (status.FilterType != (int)PackerFilterType.All)
            {
                queryt.Add(new ConditionParameter
                {
                    ColumnName = "Status",
                    Condition = QueryComparisons.Equal,
                    Value = ((PackerFilterType)status.FilterType).ToString(),
                });
            }

            if (status.BDateFilter != DateTime.MinValue)
            {
                queryt.Add(new ConditionParameter
                {
                    ColumnName = "CreateDate",
                    Condition = QueryComparisons.GreaterThanOrEqual,
                    ValueDateTime = status.BDateFilter,
                });
            }

            if (status.BDateFilter != DateTime.MinValue)
            {
                queryt.Add(new ConditionParameter
                {
                    ColumnName = "CreateDate",
                    Condition = QueryComparisons.LessThanOrEqual,
                    ValueDateTime = status.EDateFilter,
                });
            }

            var result = this.regPackageRep.GetListQueryAsync(queryt).Result;

            var statusPackages = new List<PackageStatusResponse>();
            {
                result.ForEach(r =>
                {
                    // se valida si se tiene asignado packer al paquete
                    PackerInfo packerInfo = this.GetPackerInfo(r.PackerID);
                    statusPackages.Add(new PackageStatusResponse
                    {
                        ActivityId = r.ActivityId,
                        Packer = packerInfo,
                        Remarks = r.Remark,
                        Status = r.Status,
                        CreateDate = r.CreateDate,
                    });
                });
                var rsultf = statusPackages.OrderByDescending(o => o.CreateDate).ToList();
                string message = string.Format("The status of the packages was consulted for the customer {0}", status.CustomerId);

                // RegistryLog("App", "Get Status Package", Utils.Enum.StateLog.Ok, message, status, startTime, DateTime.Now);
                return ResponseSuccess(rsultf);
            }
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        public Response<PackageAvailableResponse> GetPackageAvailable(HttpRequest request)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;

            // Se traen todos los package que esten en esta wait
            var queryt = new List<ConditionParameter>(new List<ConditionParameter>()
            {
                new ConditionParameter
                {
                    ColumnName = "Status",
                    Condition = QueryComparisons.Equal,
                    Value = PackerFilterType.Waiting.ToString(),
                },
            });

            var result = this.regPackageRep.GetListQueryAsync(queryt).Result;

            if (result == null)
            {
                var responseId = ServiceResponseCode.ErrorGeneral;
                this.RegistryLog("App", "Get Package Availble", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<PackageAvailableResponse>(responseId);
            }

            List<PackageAvailableResponse> packageAvList = new List<PackageAvailableResponse>();
            result.ForEach(r =>
            {
                // se debe consultar todas las direcciones que tiene la actividad
                var resultA = this.regPackageAddress.GetByPatitionKeyAsync(r.ActivityId).Result;

                var addressList = new List<AddressInfo>();
                resultA.ForEach(r =>
                {
                    addressList.Add(new AddressInfo()
                    {
                        Address = r.Address,
                        Adnumber = r.Adnumber,
                        City = r.City,
                        Country = r.Country,
                        Details = r.Details,
                        Lat = r.Latitude,
                        Lng = r.Longitude,
                        State = r.State,
                        Type = r.Type,
                        Formattedaddress = r.Formattedaddress,
                        Instruccions = r.Instruccions,
                        PostalCode = r.PostalCode,
                        Valid = true,
                        Id = r.Id,
                    });
                });
                packageAvList.Add(new PackageAvailableResponse() { ACtivityId = r.ActivityId, AcrivityDetails = addressList });
            });
            this.RegistryLog("App", "Get Status Package", Utils.Enum.StateLog.Ok, "Package available to manage", string.Empty, startTime, DateTime.UtcNow);
            return ResponseSuccess(packageAvList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="package">package.</param>
        /// <returns>returns.</returns>
        public Response<SendPackageResponse> SendPackage(HttpRequest request, SendPackageRespuest package)
        {
            string paymentReference = Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", string.Empty);
            Guid paymentId = Guid.NewGuid();
            this.request = request;
            DateTime startTime = DateTime.Now;
            if (package == null)
            {
                this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("sendPAckageReq");
            }

            var errorsMessage = package.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Send Pachage", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<SendPackageResponse>(errorsMessage);
            }

            // Genera el I de la actividad
            try
            {
                var activityId = Guid.NewGuid();

                // Se adiciona el paquete en la base de datos y queda en estado de procesamiento
                this.AddInfoPackages(package, activityId, out RegPackage regpackager, out bool result);
                if (!result)
                {
                    this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Error, "An error occurred in the process of sending the package, try again later", string.Empty, startTime, DateTime.UtcNow);
                    return this.ResponseFail<SendPackageResponse>(ServiceResponseCode.ErrorSendPackage);
                }

                // Se adiciona la información de las direcciones a donde se debe enviar el paquete
                this.AddAddressPackages(package, activityId, regpackager);

                // Se adiciona el detalle del pago en la base de datos.
                bool resultpd = this.AddPaymentDetail(package, paymentId);

                if (!resultpd)
                {
                    this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Error, "An error occurred in the process of sending the package, try again later", string.Empty, startTime, DateTime.UtcNow);
                    return this.ResponseFail<SendPackageResponse>(ServiceResponseCode.ErrorSendPackage);
                }

                // Se adiciona la información de pago en la base de datos.
                bool resultp = this.AddPayment(package, paymentReference, ref paymentId, activityId);
                if (!resultp)
                {
                    this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Error, "An error occurred in the process of sending the package, try again later", string.Empty, startTime, DateTime.UtcNow);
                    return this.ResponseFail<SendPackageResponse>(ServiceResponseCode.ErrorSendPackage);
                }

                string message = string.Format("The client {0} package has been sent correctly and has been assigned the id {1}", package.CustomerId, activityId);
                this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Ok, message, package, startTime, DateTime.UtcNow);
                return ResponseSuccess<SendPackageResponse>(
                    new List<SendPackageResponse>()
                    {
                        new SendPackageResponse()
                        {
                            ActivityId = activityId.ToString(),
                            PaymentId = paymentId.ToString(),
                            PaymentT = package.Payment.Payment_Type,
                            Reference = paymentReference,
                            Taxes = package.PaymentDetail.Tax,
                            TotalP = package.PaymentDetail.Total,
                            Origen = "Package",
                        },
                    });
            }
            catch (Exception error)
            {
                this.RegistryLog("App", "Send Package", Utils.Enum.StateLog.Error, "An error occurred in the process of sending the package, try again later" + error.Message, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<SendPackageResponse>(ServiceResponseCode.ErrorSendPackage);
            }
        }

        /// <summary>
        /// Esta funcón se encarga de asignar una paquete a un packer.
        /// </summary>
        /// <param name="request">Info dek request.</param>
        /// <param name="package">La información del paquete asignar.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> SetAssignPackage(HttpRequest request, AssignPackageRequest package)
        {
            this.request = request;
            DateTime startTime = DateTime.UtcNow;
            if (package == null)
            {
                this.RegistryLog("App", "Assing Package", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("AssignPackageRequest");
            }

            var errorsMessage = package.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Assing Package", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
            }

            // primero se consulta el paquete que se quiere asignar
            var result = this.regPackageRep.GetAsync(package.ActivityId).Result;

            if (result == null)
            {
                var responseId = ServiceResponseCode.ErrorGeneral;
                this.RegistryLog("App", "Assing Package", Utils.Enum.StateLog.Error, ResponseMessageHelper.GetParameter(responseId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(responseId);
            }

            result.PackerID = package.PackerId;
            result.Status = PackageStatus.Running.ToString();
            var resultUp = this.regPackageRep.AddOrUpdate(result).Result;

            if (!resultUp)
            {
                this.RegistryLog("App", "Assing Package", Utils.Enum.StateLog.Error, string.Format("Could not assign package {0} to Packer {1}", package.ActivityId, package.PackerId), string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseFail<ResultResponse>(ServiceResponseCode.UserAlreadyExist);
            }

            string message = string.Format("Package {0} was assigned to Packer {1}", package.ActivityId, package.PackerId);
            this.RegistryLog("App", "Assing Package", Utils.Enum.StateLog.Ok, message, package, startTime, DateTime.UtcNow);
            return ResponseSuccess<ResultResponse>(new List<ResultResponse>() { new ResultResponse() { Message = ResponseMessageHelper.GetParameter(ServiceResponseCode.AssingPackageOk) } });
        }

        /// <summary>
        /// Procedimiento que se encarga de adiciona las direcciones de las actividades del paquete.
        /// </summary>
        /// <param name="package">package.</param>
        /// <param name="activityId">activityId.</param>
        /// <param name="regpackager">regpackager.</param>
        private void AddAddressPackages(SendPackageRespuest package, Guid activityId, RegPackage regpackager)
        {
            List<RegPackageAddress> regpackageAddress = new List<RegPackageAddress>();
            int count = 1;
            package.AddressesInfo.ForEach(address =>
            {
                regpackageAddress.Add(new RegPackageAddress
                {
                    PartitionKey = activityId.ToString(),
                    RowKey = Guid.NewGuid().ToString(),
                    Address = address.Address,
                    Adnumber = address.Adnumber,
                    Country = address.Country,
                    State = address.State,
                    City = address.City,
                    Details = address.Details,
                    Latitude = address.Lat,
                    Longitude = address.Lng,
                    Type = address.Type,
                    Instruccions = address.Instruccions,
                    PostalCode = address.PostalCode,
                    Formattedaddress = address.Formattedaddress,
                    Id = address.Id,
                    ExecutionDate = new DateTime(1900, 1, 1),
                    HasImage = false,
                    Status = PackageStatus.Waiting.ToString(),
                    Remarks = string.Empty,
                });
                count++;
            });
            var resultA = this.regPackageAddress.MultipleAdds(regpackageAddress).Result;

            if (resultA)
            {
                // Queda en estado de espera de pago para procesar la solicitud.
                regpackager.Status = PackageStatus.WaitingPayment.ToString();
                var resultUp = this.regPackageRep.AddOrUpdate(regpackager).Result;
            }
            else
            {
                // TODO: Se debe validar forma como se debe hacer el rollback de la base de datos
            }
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="package">package.</param>
        /// <param name="activityId">activityId.</param>
        /// <param name="regpackager">regpackager.</param>
        /// <param name="result">result.</param>
        private void AddInfoPackages(SendPackageRespuest package, Guid activityId, out RegPackage regpackager, out bool result)
        {
            regpackager = new RegPackage()
            {
                PartitionKey = package.CustomerId,
                RowKey = activityId.ToString(),
                PackerID = string.Empty,
                Remark = package.Remark,
                Status = PackageStatus.Creating.ToString(),
                CreateDate = package.SendDate,
                PackerAssigDate = new DateTime(1900, 1, 1),

                // PackerAssigDate = DateTime.MinValue
                // PartitionKey = "hoila",
                // RowKey = "4565464565465",
                // PackerID = "",
                // Remark = "",
                // Status = "",
                // CreateDate = DateTime.Now,
                // PackerAssigDate = DateTime.MinValue
            };
            result = this.regPackageRep.Add(regpackager).Result;
        }

        private bool AddPayment(SendPackageRespuest package, string paymentReference, ref Guid paymentId, Guid activityId)
        {
            var paymentd = new Payment()
            {
                PartitionKey = package.CustomerId,
                RowKey = paymentId.ToString(),
                Error_type = string.Empty,
                Payment_Acceptance_Token = string.Empty,
                Payment_Cuotas = 0,
                Payment_Currency = package.Payment.Payment_Currency,
                Payment_Reference = paymentReference,
                Payment_source_id = 0,
                Payment_Status = PaymentStatus.Pending,
                Payment_Token = string.Empty,
                Payment_Type = package.Payment.Payment_Type,
                Payment_Feature = package.Payment.Payment_Feature,
                Error_Reason = string.Empty,
                ActivityId = activityId.ToString(),
            };
            var resultp = this.payment.Add(paymentd).Result;
            return resultp;
        }

        private bool AddPaymentDetail(SendPackageRespuest package, Guid paymentId)
        {
            // Registro del pago
            var paymentd = new PaymentDetail()
            {
                BaseRate = package.PaymentDetail.BaseRate,
                PartitionKey = package.CustomerId,
                RowKey = paymentId.ToString(),
                DatePayment = package.PaymentDetail.DatePayment,
                DistSurcharge = package.PaymentDetail.DistSurcharge,
                HSurcharge = package.PaymentDetail.HSurcharge,
                InsuranceValue = package.PaymentDetail.InsuranceValue,
                IVSurcharge = package.PaymentDetail.IVSurcharge,
                NSurcharge = package.PaymentDetail.NSurcharge,
                ScitySurcharge = package.PaymentDetail.ScitySurcharge,
                SSurcharge = package.PaymentDetail.SSurcharge,
                Tax = package.PaymentDetail.Tax,
                Tip = package.PaymentDetail.Tip,
                Total = package.PaymentDetail.Total,

                // PaymentMethod = package.PaymentDetail.PaymentMethod
            };

            var resultp = this.paymentDetail.Add(paymentd).Result;
            return resultp;
        }

        // private string GetContainerSasUri(string containerName)
        // {
        //    var StorageConnectionString = this.userSecretSettings.TableStorage;
        //    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(StorageConnectionString);

        // //Create the blob client object.
        //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        // //Get a reference to a container to use for the sample code, and create it if it does not exist.
        //    CloudBlobContainer container = blobClient.GetContainerReference(containerName);
        //    //CloudBlockBlob blob = container.GetBlockBlobReference(BlobName);

        // //Set the expiry time and permissions for the blob.
        //    //In this case, the start time is specified as a few minutes in the past, to mitigate clock skew.
        //    //The shared access signature will be valid immediately.
        //    SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy
        //    {
        //        SharedAccessStartTime = DateTimeOffset.UtcNow.AddMinutes(-5),
        //        SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddHours(1),
        //        Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write
        //    };

        // //Generate the shared access signature on the blob, setting the constraints directly on the signature.
        //    string sasBlobToken = container.GetSharedAccessSignature(sasConstraints);

        // //Return the URI string for the container, including the SAS token.
        //    return container.Uri + sasBlobToken;
        // }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="packerID">packerID.</param>
        /// <param name="aditionalInfo">AditionalInfo.</param>
        /// <returns>returns.</returns>
        private PackerInfo GetPackerInfo(string packerID, bool aditionalInfo = false)
        {
            PackerInfo packerInfo = null;
            if (!string.IsNullOrEmpty(packerID))
            {
                packerInfo = new PackerInfo();
                var resultu = this.user.GetByPartitionKeyAndRowKeyAsync("packer", packerID, FilterType.None).Result;
                if (resultu == null || resultu.Count == 0)
                {
                    return null;
                }

                string blodImage = string.Format("packer-{0}/", packerID);
                packerInfo.PackerId = packerID;
                packerInfo.FirstName = resultu[0].FirstName;
                packerInfo.MidleName = resultu[0].MiddleName;
                packerInfo.LastName = resultu[0].LastName;
                var resultpi = this.packer.GetByPartitionKeyAndRowKeyAsync("packer", packerID, FilterType.None).Result;
                if (resultpi == null || resultpi.Count == 0)
                {
                    return null;
                }

                if (aditionalInfo)
                {
                    packerInfo.Mobile = resultpi[0].Mobile;
                    packerInfo.VehicleType = resultpi[0].VehicleType;
                    packerInfo.VehiclePlate = resultpi[0].VehiclePlate;
                    packerInfo.Brand = resultpi[0].Brand;
                    packerInfo.Reference = resultpi[0].Reference;
                    packerInfo.UrlImage = this.GetContainerSasUri("docspackers", string.Format("{0}{1}", blodImage, "rostropacker.png"));
                    packerInfo.UrlVehicle = this.GetContainerSasUri("docspackers", string.Format("{0}{1}", blodImage, "vehiculo.jpg"));
                }
                else
                {
                    packerInfo.Mobile = 0;
                    packerInfo.VehicleType = string.Empty;
                    packerInfo.VehiclePlate = string.Empty;
                    packerInfo.Brand = string.Empty;
                    packerInfo.Reference = string.Empty;
                    packerInfo.UrlImage = string.Empty;
                    packerInfo.UrlVehicle = string.Empty;
                }
            }

            // docspackers
            return packerInfo;
        }
    }
}