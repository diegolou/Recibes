namespace VIPPAC.Entities.Responses
{
    public class CountryResponse
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
        public string ShortCode { get; set; }

        public bool IsActivated { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Lat { get; set; }

        /// <summary>
        ///
        /// </summary>
        public double Lng { get; set; }
    }
}