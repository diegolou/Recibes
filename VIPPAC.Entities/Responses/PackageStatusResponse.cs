using System;

namespace VIPPAC.Entities.Responses
{
    public class PackageStatusResponse

    {
        /// <summary>
        ///
        /// </summary>
        public string ActivityId { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        ///
        /// </summary>
        public string Remarks { get; set; }

        /// <summary>
        ///
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        ///
        /// </summary>
        public PackerInfo Packer { get; set; }
    }
}