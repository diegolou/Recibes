// <copyright file="ParameterBI.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Business
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.Extensions.Options;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;
    using VIPPAC.Business.Referentials;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;
    using VIPPAC.Entities.Tables;
    using VIPPAC.Utils.ResponseMessages;

    /// <summary>
    /// .
    /// </summary>
    public class ParameterBI : BusinessBase<ParametersResponse>, IParametersBI
    {
        private readonly IGenericRep<PackageType> packType;

        /// <summary>
        /// Parameters Repository.
        /// </summary>
        private readonly IGenericRep<Parameter> paramentRep;

        private readonly IGenericRep<Tips> tips;
        private readonly IGenericRep<TransportType> transType;
        private readonly UserSecretSettings userSecretSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="ParameterBI"/> class.
        /// </summary>
        /// <param name="paramentRep">paramentRep.</param>
        /// <param name="logRep">logRep.</param>
        /// <param name="transType">transType.</param>
        /// <param name="packType">packType.</param>
        /// <param name="tips">tips.</param>
        /// <param name="options">options.</param>
        public ParameterBI(
            IGenericRep<Parameter> paramentRep,
            IGenericRep<Log> logRep,
            IGenericRep<TransportType> transType,
            IGenericRep<PackageType> packType,
            IGenericRep<Tips> tips,
            IOptions<UserSecretSettings> options)
        {
            if (options == null)
            {
                throw new ArgumentNullException("options");
            }

            this.paramentRep = paramentRep;
            this.transType = transType;
            this.packType = packType;
            this.tips = tips;
            this.logRep = logRep;
            this.userSecretSettings = options.Value;
        }

        /// <summary>
        /// Method to All Get Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        public Response<ParametersResponse> GetAllParametersByType(string type)
        {
            if (string.IsNullOrEmpty(type))
            {
                return this.ResponseFail<ParametersResponse>(ServiceResponseCode.BadRequest);
            }

            var result = this.paramentRep.GetByPatitionKeyAsync(type).Result;
            if (result == null || result.Count == 0)
            {
                return ResponseFail<ParametersResponse>();
            }

            result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            var parametsList = new List<ParametersResponse>();

            result.ForEach(r =>
            {
                parametsList.Add(new ParametersResponse
                {
                    ImageFile = r.ImageFile,
                    Id = r.Id,
                    Type = r.Type,
                    Value = r.Value,
                    ValueAdd = r.ValueAdd,
                    ValueAdd2 = r.ValueAdd2,
                    Desc = r.Description,
                    Active = r.Active,
                    Required = r.Required,
                });
            });
            return ResponseSuccess(parametsList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<List<string>> GetCategories()
        {
            var distinctItems = this.paramentRep.GetListAsync().Result.GroupBy(x => x.PartitionKey).Select(y => y.First());
            List<string> result = new List<string>();
            foreach (var item in distinctItems)
            {
                result.Add(item.Type);
            }

            var listList = new List<List<string>>
            {
                result,
            };

            return ResponseSuccessList(listList);
        }

        /// <summary>
        /// Get secure Url Blob.
        /// </summary>
        /// <param name="containerName">container.</param>
        /// <param name="blobName">blobName.</param>
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
        /// <param name="containerName">containerName.</param>
        /// <returns>returns.</returns>
        public string GetContainerSasUri(string containerName)
        {
            var storageConnectionString = this.userSecretSettings.TableStorage;
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the blob client object.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Get a reference to a container to use for the sample code, and create it if it does not exist.
            CloudBlobContainer container = blobClient.GetContainerReference(containerName);

            // CloudBlockBlob blob = container.GetBlockBlobReference(BlobName);

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
            string sasBlobToken = container.GetSharedAccessSignature(sasConstraints);

            // Return the URI string for the container, including the SAS token.
            return container.Uri + sasBlobToken;
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="countryCode">countryCode.</param>
        /// <returns>returnrs.</returns>
        public Response<TipsResponse> GetCountryTips(string countryCode)
        {
            if (string.IsNullOrEmpty(countryCode))
            {
                return this.ResponseFail<TipsResponse>(ServiceResponseCode.BadRequest);
            }

            var result = this.tips.GetByPatitionKeyAsync(countryCode).Result;
            if (result == null || result.Count == 0)
            {
                return ResponseNotFound<TipsResponse>();
            }

            // result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            var tipsList = new List<TipsResponse>();
            result.Sort((p, q) => p.Value.CompareTo(q.Value));
            result.ForEach(r =>
            {
                tipsList.Add(new TipsResponse
                {
                    Country = r.Country,
                    Id = r.Id,
                    Value = (decimal)r.Value,
                });
            });
            return ResponseSuccess(tipsList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<PackageTypeResponse> GetPackageType()
        {
            var resultList = new List<PackageTypeResponse>();

            // var resultf = null;
            var result = this.packType.GetListAsync().Result;
            if (result == null || result.Count == 0)
            {
                return ResponseFail<PackageTypeResponse>();
            }

            // var paraments = new List<Parameter>();
            // result.ForEach(r => paraments.Add(r));
            // result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            // var paramentsResult = new List<ParametersResponse>();
            result.ForEach(d =>
            resultList.Add(new PackageTypeResponse
            {
                Code = d.Code,
                Distancia_ini = d.Distancia_ini,
                Name = d.Name,
                Recargo_fest = d.Recargo_fest,
                Recargo_noc = d.Recargo_noc,
                ServiceCode = d.ServiceCode,
                Tarifa_ini = d.Tarifa_ini,
                Tarifa_mts = d.Tarifa_mts,
                Tarife_sec = d.Tarife_sec,
                Type = d.Type,
                Image = d.Image,
                DistanceLimit = d.DistanceLimit,
                SizeLimit = d.SizeLimit,
                WeightLimit = d.WeightLimit,
            }));
            return ResponseSuccess(resultList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>Returns.</returns>
        public Response<ResponseUrlRecord> GetParamC()
        {
            var response = new List<ResponseUrlRecord>
            {
                new ResponseUrlRecord
                {
                    URL = this.GetContainerSasUri("activitypackages"),
                },
            };
            return ResponseSuccess(response);
        }

        /// <summary>
        /// Method to Get Parameters.
        /// </summary>
        /// <returns>returns.</returns>
        public Response<ParametersResponse> GetParameters()
        {
            var result = this.paramentRep.GetListAsync().Result;
            if (result == null || result.Count == 0)
            {
                return ResponseFail<ParametersResponse>();
            }

            var paraments = new List<Parameter>();
            result.ForEach(r => paraments.Add(r));
            result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            var paramentsResult = new List<ParametersResponse>();
            paraments.ToList().ForEach(d =>
            paramentsResult.Add(new ParametersResponse
            {
                Type = d.Type,
                Id = d.Id,
                Value = d.Value,
                ValueAdd = d.ValueAdd,
                ValueAdd2 = d.ValueAdd2,
                Desc = d.Description,
                ImageFile = d.ImageFile,
                Required = d.Required,
                Active = d.Active,
            }));
            return ResponseSuccess(paramentsResult);
        }

        /// <summary>
        /// Method to Get Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        public Response<ParametersResponse> GetParametersByType(string type)
        {
            if (string.IsNullOrEmpty(type))
            {
                return this.ResponseFail<ParametersResponse>(ServiceResponseCode.BadRequest);
            }

            var result = this.paramentRep.GetByPatitionKeyAsync(type).Result;
            if (result == null || result.Count == 0)
            {
                return ResponseFail<ParametersResponse>();
            }

            result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            var parametsList = new List<ParametersResponse>();

            result.ForEach(r =>
            {
                if (r.Active)
                {
                    parametsList.Add(new ParametersResponse
                    {
                        ImageFile = r.ImageFile,
                        Id = r.Id,
                        Type = r.Type,
                        Value = r.Value,
                        ValueAdd = r.ValueAdd,
                        ValueAdd2 = r.ValueAdd2,
                        Desc = r.Description,
                        Active = r.Active,
                        Required = r.Required,
                    });
                }
            });
            return ResponseSuccess(parametsList);
        }

        /// <summary>
        /// Method to Get Some Parameters By Type.
        /// </summary>
        /// <param name="type">type.</param>
        /// <returns>returns.</returns>
        public Response<ParametersResponse> GetSomeParametersByType(IList<string> type)
        {
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            if (type.Count == 0)
            {
                return this.ResponseFail<ParametersResponse>(ServiceResponseCode.BadRequest);
            }

            var result = new List<Parameter>();
            foreach (var t in type)
            {
                var res = this.paramentRep.GetByPatitionKeyAsync(t).Result;
                res.ForEach(p => result.Add(p));
            }

            if (result == null || result.Count == 0)
            {
                return ResponseFail<ParametersResponse>();
            }

            result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            var parametsList = new List<ParametersResponse>();

            result.ForEach(r =>
            {
                if (r.Active)
                {
                    parametsList.Add(new ParametersResponse
                    {
                        ImageFile = r.ImageFile,
                        Id = r.Id,
                        Type = r.Type,
                        Value = r.Value,
                        ValueAdd = r.ValueAdd,
                        ValueAdd2 = r.ValueAdd2,
                        Desc = r.Description,
                        Active = r.Active,
                        Required = r.Required,
                    });
                }
            });
            return ResponseSuccess(parametsList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <returns>returns.</returns>
        public Response<TransportTypeResponse> GetTransportType()
        {
            var resultList = new List<TransportTypeResponse>();

            // var resultf = null;
            var result = this.transType.GetListAsync().Result;
            if (result == null || result.Count == 0)
            {
                return ResponseFail<TransportTypeResponse>();
            }

            // var paraments = new List<Parameter>();
            // result.ForEach(r => paraments.Add(r));
            // result.Sort((p, q) => string.Compare(p.SortBy, q.SortBy, StringComparison.CurrentCulture));
            // var paramentsResult = new List<ParametersResponse>();
            result.ForEach(d =>
            resultList.Add(new TransportTypeResponse
            {
                Code = d.Code,

                // distancia_ini = d.distancia_ini,
                Name = d.Name,

                // recargo_fest = d.recargo_fest,
                // recargo_noc = d.recargo_noc,
                ServiceCode = d.ServiceCode,

                // tarifa_ini = d.tarifa_ini,
                // tarifa_mts = d.tarifa_mts,
                // tarife_sec = d.tarife_sec,
                // type = d.type,
                // Image = d.Image,
                // distanceLimit = d.distanceLimit,
                // sizeLimit = d.sizeLimit,
                // weightLimit = d.weightLimit
            }));
            return ResponseSuccess(resultList);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        public Response<ResponseUrlRecord> GetUrlDownloadBlob(GetUrlDownloadBlobRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }

            var response = new List<ResponseUrlRecord>
            {
                new ResponseUrlRecord
                {
                    URL = this.GetContainerSasUri(request.ContainerName, request.FileName),
                },
            };
            return ResponseSuccess(response);
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        public Response<ParametersResponse> SetParameterValue(SetParameterValueRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }

            var result = this.paramentRep.GetByPartitionKeyAndRowKeyAsync(request.Category, request.ParameterId).Result;

            if (result == null || result.Count == 0)
            {
                return ResponseFail<ParametersResponse>();
            }

            var parameter = result.FirstOrDefault();
            parameter.Value = request.ParameterValue;
            parameter.Description = request.ParameterDesc;
            parameter.Active = request.ParameterState;
            parameter.ImageFile = request.ParameterImg;
            this.paramentRep.AddOrUpdate(parameter);

            ParametersResponse response = new ParametersResponse
            {
                Desc = parameter.Description,
                Id = parameter.Id,
                Type = parameter.Type,
                Value = parameter.Value,
                ValueAdd = parameter.ValueAdd,
                ValueAdd2 = parameter.ValueAdd2,
                ImageFile = parameter.ImageFile,
            };
            return ResponseSuccess(new List<ParametersResponse> { response });
        }
    }
}