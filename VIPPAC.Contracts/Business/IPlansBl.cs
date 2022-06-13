namespace VIPPAC.Contracts.Business
{
    using Microsoft.AspNetCore.Http;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Requests;
    using VIPPAC.Entities.Responses;

    public interface IPlansBl
    {
        /// <summary>
        /// Retorns todos los planes registrados Publicos y Privados
        /// </summary>
        /// <returns></returns>
        Response<PlansResponse> GetPlans();

        /// <summary>
        /// Retorna todos los planes publicos registrados
        /// </summary>
        /// <returns></returns>
        Response<PlansResponse> GetPlansAdmin();

        /// <summary>
        /// Retorna los planes asociados por Pais
        /// </summary>
        /// <param name="country">Código del Pais</param>
        /// <returns></returns>
        Response<PlansResponse> GetPlansbyCountries(string country);

        /// <summary>
        /// Retorna todos los planes publicos activos en Recibes
        /// </summary>
        /// <returns></returns>
        Response<PlansResponse> GetPlansActive();

        /// <summary>
        /// Crea un nuevo Plan
        /// </summary>
        /// <param name="request">Información general del Request</param>
        /// <param name="plans">Información del nuevo Plan</param>
        /// <returns></returns>
        Response<ResultResponse> SetPlans(HttpRequest request, SetPlansRequest plans);

        /// <summary>
        /// Autualizar un  Plan
        /// </summary>
        /// <param name="request">Información general del Request</param>
        /// <param name="plans">Información del nuevo Plan</param>
        /// <returns></returns>
        Response<ResultResponse> UpdatePlans(HttpRequest request, PlansRequest plans);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="idPlan"></param>
        /// <returns></returns>
        Response<ResultResponse> DeletePlans(HttpRequest request, string idCountry, string idPlan);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cp"></param>
        /// <returns></returns>
        Response<ResultResponse> AdminCustomersPrivstePlans(HttpRequest request, AdminCustomerPrivatePlansRequest cp);

        /// <summary>
        ///
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cp"></param>
        /// <returns></returns>
        Response<ResultResponse> DeleteCustomersPrivstePlans(HttpRequest request, AdminCustomerPrivatePlansRequest cp);
    }
}