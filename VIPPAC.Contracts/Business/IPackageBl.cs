// <copyright file="IPackageBl.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// IPackageBl.
    /// </summary>
    public interface IPackageBl
    {
        /// <summary>
        /// SendPackage.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="packer">packer.</param>
        /// <returns>returns.</returns>
        public Response<SendPackageResponse> SendPackage(HttpRequest request, SendPackageRespuest packer);

        /// <summary>
        /// GetCustomerPackageStatus.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="status">status.</param>
        /// <returns>returns.</returns>
        public Response<PackageStatusResponse> GetCustomerPackageStatus(HttpRequest request, CustomerPackageStatusRequest status);

        /// <summary>
        /// GetPackageAvailable.
        /// </summary>
        /// <param name="request">request.</param>
        /// <returns>returns.</returns>
        public Response<PackageAvailableResponse> GetPackageAvailable(HttpRequest request);

        /// <summary>
        /// SetAssignPackage.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="package">package.</param>
        /// <returns>returns.</returns>
        public Response<ResultResponse> SetAssignPackage(HttpRequest request, AssignPackageRequest package);

        /// <summary>
        /// GetActivityDetail.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="activity">activity.</param>
        /// <returns>returns.</returns>
        public Response<GetActivityDetailResponse> GetActivityDetail(HttpRequest request, GetActivityDetailRequest activity);
    }
}