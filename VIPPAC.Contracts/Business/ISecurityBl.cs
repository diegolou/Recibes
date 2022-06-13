namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface ISecurityBl
    {
        /// <summary>
        /// Method to Authenticate User
        /// </summary>
        /// <param name="userReq"></param>
        /// <returns></returns>
        Response<AuthenticateUserResponse> AuthenticateUser(HttpRequest request, AuthenticateUserRequest userReq);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userReq"></param>
        /// <returns></returns>
        Response<ResultResponse> ActivationUser(HttpRequest request, ActivationUserRequest userReq);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="userReq"></param>
        /// <returns></returns>
        Response<ActivationCodeResponse> ActivationCode(HttpRequest request, CustomerRequest userReq);
    }
}