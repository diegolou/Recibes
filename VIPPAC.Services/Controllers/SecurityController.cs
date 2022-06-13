// <copyright file="SecurityController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Services.Controllers
{
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    /// <summary>
    /// .
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        /// <summary>
        /// Interface of User business logic.
        /// </summary>
        /// <author>Luis Jorge Bonilla Angel.</author>
        private readonly ISecurityBl userBussines;

        /// <summary>
        /// Initializes a new instance of the <see cref="SecurityController"/> class.
        /// </summary>
        /// <param name="userBussines">UserBussines.</param>
        /// <author>Luis Jorge Bonilla Angel.</author>
        public SecurityController(ISecurityBl userBussines)
        {
            this.userBussines = userBussines;
        }

        /// <summary>
        /// Operation to Authenticate User.
        /// </summary>
        /// <param name="userRequest">userRequest.</param>
        /// <returns>returns.</returns>
        /// <author>Luis Jorge Bonilla Angel.</author>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("AuthenticateUser")]
        [Produces(typeof(Response<AuthenticateUserResponse>))]
        public IActionResult AuthenticateUser([FromBody] AuthenticateUserRequest userRequest)
        {
            return this.Ok(this.userBussines.AuthenticateUser(this.Request, userRequest));
        }

        /// <summary>
        /// Web Api to activate the client in "Recibes".
        /// </summary>
        /// <param name="userRequest">userRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("ActivateUser")]
        [Produces(typeof(Response<ResultResponse>))]
        public IActionResult ActivateUser([FromBody] ActivationUserRequest userRequest)
        {
            return this.Ok(this.userBussines.ActivationUser(this.Request, userRequest));
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="userRequest">userRequest.</param>
        /// <returns>returns.</returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("ActivationCode")]
        [Produces(typeof(Response<ActivationCodeResponse>))]
        public IActionResult ActivationCode([FromBody] CustomerRequest userRequest)
        {
            return this.Ok(this.userBussines.ActivationCode(this.Request, userRequest));
        }
    }
}