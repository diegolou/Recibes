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
    /// 
    /// </summary>
    public class EcommerceBl : BusinessBase<Products>, IEcommerceBl
    {

        private readonly IGenericRep<Products> products;
        private readonly IGenericRep<EnterprisebyProduct> enterprises;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="products"></param>

        public EcommerceBl(IGenericRep<Products> products, IGenericRep<EnterprisebyProduct> enterprises)
            
        {
            this.products = products;
            this.enterprises = enterprises;
            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Response<GetEnterpriseProductResponse> GetEnterprises(GetEnterprisebySecteurRequest request)
        {
            
            DateTime startTime = DateTime.UtcNow;
            if (request == null)
            {
                this.RegistryLog("App", "Get Enterprices by secteur Info", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = request.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Enterprices by secteur Info", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GetEnterpriseProductResponse>(errorsMessage);
            }

            var queryt = new List<ConditionParameter>()
            { new ConditionParameter
                {
                    ColumnName="Secteur",
                    Condition = QueryComparisons.Equal,
                    Value = request.Search,
                }
            };

            var result = this.enterprises.GetListQueryAsync(queryt).Result;

                   
            if (result == null || result.Count == 0)
            {
                return ResponseFail<GetEnterpriseProductResponse>();
            }
            var resultEnterprise = new List<GetEnterpriseProductResponse>();

            result.ForEach(r =>
            {
                if (r.Secteur.IndexOf(request.Search) == 0)
                {
                    resultEnterprise.Add(new GetEnterpriseProductResponse
                    {
                        CompanyCode = r.CompanyCode,
                        CompanyName = r.CompanyName,
                        CompanySecteur = r.Secteur

                    });
                }
            });
            return ResponseSuccess<GetEnterpriseProductResponse>(resultEnterprise);
                       
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Response<GetEnterpriseProductResponse> GetEnterpriseProducts()
        {

            List<GetEnterpriseProductResponse> resultEnterprise = GetEnterpriseProdcutsInternal();
            return ResponseSuccess(resultEnterprise);
        }
        /// <summary>
        /// Función que se encarga de traer todos los planes registros en el sistema
        /// </summary>
        /// <returns>Lista completa de planes</returns>
        private List<GetEnterpriseProductResponse> GetEnterpriseProdcutsInternal()
        {
            var resultEnterprise = new List<GetEnterpriseProductResponse>();

            var result = this.enterprises.GetListAsync().Result;

            result.ForEach(r =>
            {
                resultEnterprise.Add(new GetEnterpriseProductResponse
                {
                    CompanyCode = r.CompanyCode,
                    CompanyName = r.CompanyName,
                    CompanySecteur = r.Secteur

                });
            });
            return resultEnterprise;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Response<GetProductResponse> GetProducts()
        {
           
            List<GetProductResponse> resultProducts = GetProdcutsInternal();
            return ResponseSuccess(resultProducts);
        }
        
        /// <summary>
        /// Función que se encarga de traer todos los planes registros en el sistema
        /// </summary>
        /// <returns>Lista completa de planes</returns>
        private List<GetProductResponse> GetProdcutsInternal()
        {
            var resultProducts = new List<GetProductResponse>();

            var result = this.products.GetListAsync().Result;

            result.ForEach(r =>
            {
                resultProducts.Add(new GetProductResponse
                {
                    CompanyCode = r.CompanyCode,
                    ProductCode = r.ProductCode,
                    ProductName = r.Name,
                    ProductPrice = r.Price,
                    ProductTax = r.Tax,
                    ProductImage = r.Image,
                    ProductUnit = r.Unit
                    
                });
            });
            return resultProducts;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Response<GetProductResponse> GetProductsbyEnterpreise(GetProductRequest request)
        {

            DateTime startTime = DateTime.UtcNow;
            if (request == null)
            {
                this.RegistryLog("App", "Get Product by Enterprise Info", Utils.Enum.StateLog.Error, "Null values exist", string.Empty, startTime, DateTime.UtcNow);
                throw new ArgumentNullException("userReq");
            }

            var errorsMessage = request.Validate().ToList();
            if (errorsMessage.Count > 0)
            {
                this.RegistryLog("App", "Get Product by Enterprise Info", Utils.Enum.StateLog.Error, errorsMessage, string.Empty, startTime, DateTime.UtcNow);
                return this.ResponseBadRequest<GetProductResponse>(errorsMessage);
            }

            var queryt = new List<ConditionParameter>()
            { new ConditionParameter
                {
                    ColumnName="PartitionKey",
                    Condition = QueryComparisons.Equal,
                    Value = request.CompanyCode,
                }
            };

            var result = this.products.GetListQueryAsync(queryt).Result;


            if (result == null || result.Count == 0)
            {
                return ResponseFail<GetProductResponse>();
            }
            var resultProduct = new List<GetProductResponse>();

            result.ForEach(r =>
            {
                if (r.CompanyCode.IndexOf(request.CompanyCode) == 0)
                {
                    resultProduct.Add(new GetProductResponse
                    {
                        CompanyCode = r.CompanyCode,
                        ProductCode = r.ProductCode,
                        ProductImage = r.Image,
                        ProductName = r.Name,
                        ProductPrice = r.Price,
                        ProductTax = r.Tax,
                        ProductUnit = r.Unit

                    });
                }
            });
            return ResponseSuccess<GetProductResponse>(resultProduct);

        }

    }
}
