// <copyright file="WampiResponse.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Entities.Responses
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// WampiResponse.
    /// </summary>
    public class WampiResponse
    {
        /// <summary>
        /// Gets or sets Data.
        /// </summary>
        public DataType Data { get; set; }

        /// <summary>
        /// Gets or sets Meta.
        /// </summary>
        public object Meta { get; set; }

        /// <summary>
        /// Gets or sets DataType.
        /// </summary>
        public class DataType
        {
            /// <summary>
            /// Gets or sets Id.
            /// </summary>
            public string Id { get; set; }

            /// <summary>
            /// Gets or sets Created_At.
            /// </summary>
            public DateTime Created_At { get; set; }

            /// <summary>
            /// Gets or sets Amount_In_Cents.
            /// </summary>
            public int Amount_In_Cents { get; set; }

            /// <summary>
            /// Gets or sets Reference.
            /// </summary>
            public string Reference { get; set; }

            /// <summary>
            /// Gets or sets Currency.
            /// </summary>
            public string Currency { get; set; }

            /// <summary>
            /// Gets or sets Payment_Method_Type.
            /// </summary>
            public string Payment_Method_Type { get; set; }

            /// <summary>
            /// Gets or sets Payment_Method.
            /// </summary>
            public Payment_MethodType Payment_Method { get; set; }

            /// <summary>
            /// Gets or sets Redirect_Url.
            /// </summary>
            public string Redirect_Url { get; set; }

            /// <summary>
            /// GEts or sets Status.
            /// </summary>
            public string Status { get; set; }

            /// <summary>
            /// GEts or sets Status_Message.
            /// </summary>
            public string Status_Message { get; set; }

            /// <summary>
            /// Gets or sets Merchant.
            /// </summary>
            public MerchantType Merchant { get; set; }

            /// <summary>
            /// GETs or sets Taxes.
            /// </summary>
            public List<object> Taxes { get; set; }
        }

        /// <summary>
        /// ExtraType.
        /// </summary>
        public class ExtraType
        {
            /// <summary>
            /// Gets or sets Ticket_Id.
            /// </summary>
            public string Ticket_Id { get; set; }

            /// <summary>
            /// Gets or sets Return_Code.
            /// </summary>
            public string Return_Code { get; set; }

            /// <summary>
            /// Gets or sets Request_Date.
            /// </summary>
            public string Request_Date { get; set; }

            /// <summary>
            /// Gets or sets Async_Payment_Url.
            /// </summary>
            public string Async_Payment_Url { get; set; }

            /// <summary>
            /// Gets or sets Traceability_Code.
            /// </summary>
            public string Traceability_Code { get; set; }

            /// <summary>
            /// Gets or sets Transaction_Cycle.
            /// </summary>
            public string Transaction_Cycle { get; set; }

            /// <summary>
            /// Gets or sets Transaction_State.
            /// </summary>
            public string Transaction_State { get; set; }

            /// <summary>
            /// Gets or sets External_Identifier.
            /// </summary>
            public string External_Identifier { get; set; }

            /// <summary>
            /// Gets or sets Bank_Processing_Date.
            /// </summary>
            public string Bank_Processing_Date { get; set; }
        }

        /// <summary>
        /// Gets or sets Payment_MethodType.
        /// </summary>
        public class Payment_MethodType
        {
            /// <summary>
            /// Gets or Sets Type.
            /// </summary>
            public string Type { get; set; }

            /// <summary>
            /// Gets or Sets Extra.
            /// </summary>
            public ExtraType Extra { get; set; }
        }

        /// <summary>
        /// MerchantType.
        /// </summary>
        public class MerchantType
        {
            /// <summary>
            /// Gets or sets name.
            /// </summary>
            public string Name { get; set; }

            /// <summary>
            /// Gets or sets legal_Name.
            /// </summary>
            public string Legal_Name { get; set; }

            /// <summary>
            /// Gets or sets contact_Name.
            /// </summary>
            public string Contact_Name { get; set; }

            /// <summary>
            /// Gets or sets Phone_Number.
            /// </summary>
            public string Phone_Number { get; set; }

            /// <summary>
            /// Gets or sets logo_Url.
            /// </summary>
            public string Logo_Url { get; set; }

            /// <summary>
            /// Gets or sets legal_Id_Type.
            /// </summary>
            public string Legal_Id_Type { get; set; }

            /// <summary>
            /// Gets or sets email.
            /// </summary>
            public string Email { get; set; }

            /// <summary>
            /// Gets or sets legal_Id.
            /// </summary>
            public string Legal_Id { get; set; }
        }
    }
}