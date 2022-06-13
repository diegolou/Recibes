using System;
using System.Collections.Generic;

namespace VIPPAC.Entities.Responses
{
    public class GetActivityDetailResponse
    {
        /// <summary>
        ///
        /// </summary>
        public string ActivityID { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime PackerAssigDate { get; set; }

        /// <summary>
        ///
        /// </summary>
        public PackerInfo Packer { get; set; }

        /// <summary>
        ///
        /// </summary>
        public List<AddressInfo> AddressInfoList { get; set; }
    }
}