namespace VIPPAC.Entities.Responses
{
    using System.Collections.Generic;

    public class CountryInfoResponse
    {
        /// <summary>
        ///
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// </summary>
        public int CCode { get; set; }

        /// <summary>
        ///
        /// </summary>
        public List<ValueResponse> States { get; set; }
    }
}