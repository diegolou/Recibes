using System.Collections.Generic;

namespace VIPPAC.Entities.Responses
{
    /// <summary>
    ///
    /// </summary>
    public class StateResponse
    {
        public string Country { get; set; }

        public int Code { get; set; }

        public string Name { get; set; }

        public List<ValueResponse> Cities { get; set; }
    }
}