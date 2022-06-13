namespace VIPPAC.Entities.Responses
{
    using System.Collections.Generic;
    using VIPPAC.Entities.Tables;

    /// <summary>
    ///
    /// </summary>
    public class ParameterLocationResponse
    {
        /// <summary>
        ///
        /// </summary>
        public List<Country> Countries { get; set; }

        /// <summary>
        ///
        /// </summary>
        public List<State> States { get; set; }

        /// <summary>
        ///
        /// </summary>
        public List<City> Cities { get; set; }
    }
}