namespace VIPPAC.Entities.Responses
{
    using System;

    public class TipsResponse
    {
        public string Country { get; set; }
        public Guid Id { get; set; }
        public decimal Value { get; set; }
    }
}