namespace VIPPAC.Entities.Responses
{
    using System;

    public class GeoLocationResultResponse
    {
        public decimal Lat { get; set; }

        public decimal Lon { get; set; }

        public decimal Alt { get; set; }

        public decimal Spe { get; set; }

        public decimal Acc { get; set; }

        public DateTime TSM { get; set; }

        public DateTime TS { get; set; }
    }
}