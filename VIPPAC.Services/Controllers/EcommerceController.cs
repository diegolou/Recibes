using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using VIPPAC.Contracts.Business;
using VIPPAC.Entities.Referentials;
using VIPPAC.Entities.Requests;
using VIPPAC.Entities.Responses;

namespace VIPPAC.Services.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EcommerceController : ControllerBase
    {
        private readonly IEcommerceBl _Ecommerce;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="eCommerce"></param>
        public EcommerceController(IEcommerceBl eCommerce)
        {
            _Ecommerce = eCommerce;
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetProducts")]
        [Produces(typeof(Response<GetProductResponse>))]
        public IActionResult GetProducts()
        {
            return Ok(_Ecommerce.GetProducts());
            
        }
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetEnterpriseProducts")]
        [Produces(typeof(Response<GetEnterpriseProductResponse>))]
        public IActionResult GetEnterpriseProducts()  
        {
            return Ok(_Ecommerce.GetEnterpriseProducts());
            
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetEnterprises")]
        [Produces(typeof(Response<GetEnterpriseProductResponse>))]
        public IActionResult GetEnterprises([FromBody] GetEnterprisebySecteurRequest request)
        {
            return Ok(_Ecommerce.GetEnterprises(request));
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("GetProductsbyEnterpreise")]
        [Produces(typeof(Response<GetProductResponse>))]
        public IActionResult GetProductsbyEnterpreise([FromBody] GetProductRequest request)
        {
            return Ok(_Ecommerce.GetProductsbyEnterpreise(request));
        }
        
    }
}
