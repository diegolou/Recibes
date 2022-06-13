namespace VIPPAC.Entities.Responses
{
    public class GetRateCitiesActiveResponse
    {
        public string CityCode { get; set; }

        public string PackageCode { get; set; }
        public bool Active { get; set; }

        public double DistanceLimit { get; set; }
        public double Distance_sec { get; set; }

        public double Distancia_ini { get; set; }

        public double Recargo_fest { get; set; }

        public double Recargo_noc { get; set; }

        public double Tarifa_ini { get; set; }

        public double Tarifa_mts { get; set; }

        public double Tarife_sec { get; set; }
    }
}