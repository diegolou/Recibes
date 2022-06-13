using System;

namespace VIPPAC.Entities.Responses
{
    public class CityResponse
    {
        public string LgCode { get; set; }

        /// <summary>
        /// Code
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string GoogleMapCP { get; set; }

        public Guid CodeGuid { get; set; }
    }
}