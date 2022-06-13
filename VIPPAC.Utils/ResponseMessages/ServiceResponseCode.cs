// <copyright file="ServiceResponseCode.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Utils.ResponseMessages
{
    /// <summary>
    /// Codes to response de logic services.
    /// </summary>
    public enum ServiceResponseCode
    {
        /// <summary>
        /// The success
        /// </summary>
        Success = 200,

        /// <summary>
        /// The internal error
        /// </summary>
        InternalError = 500,

        /// <summary>
        /// The service external error
        /// </summary>
        ServiceExternalError = 501,

        /// <summary>
        /// The bad request
        /// </summary>
        BadRequest = 102,

        /// <summary>
        /// The token and device not found
        /// </summary>
        ErrorSendPackage = 104,

        /// <summary>
        /// The Agent not Available.
        /// </summary>
        AssingPackageOk = 105,

        /// <summary>
        /// The User Not Found.
        /// </summary>
        UserNotFound = 106,

        /// <summary>
        /// The Agent Not Found.
        /// </summary>
        SendPackageOk = 107,

        /// <summary>
        /// Device not found
        /// </summary>
        DeviceNotFound = 108,

        /// <summary>
        /// The Company Not Found.
        /// </summary>
        CompanyNotFount = 108,

        /// <summary>
        /// User isn't authenticate
        /// </summary>
        IsNotAuthenticateInDevice = 109,

        /// <summary>
        /// Incorrect Password in Login
        /// </summary>
        IncorrectPassword = 110,

        /// <summary>
        /// the user is not register in tablestorage
        /// </summary>
        IsNotRegisterInAz = 115,

        /// <summary>
        /// the user is not register in ldap
        /// </summary>
        IsNotRegisterInLdap = 120,

        /// <summary>
        /// User is desable
        /// </summary>
        UserDesable = 122,

        /// <summary>
        /// User is block
        /// </summary>
        UserBlock = 123,

        /// <summary>
        /// Invalid token resetPassword
        /// </summary>
        InvalidtokenRPassword = 124,

        /// <summary>
        /// Expired token resetPassword
        /// </summary>
        ExpiredtokenRPassword = 125,

        /// <summary>
        /// User Already Exist functionarie
        /// </summary>
        UserAlredyExistF = 126,

        /// <summary>
        /// Parameter not found
        /// </summary>
        ParameterNotFound = 127,

        /// <summary>
        /// Failed Attempts
        /// </summary>
        FailedAttempts = 128,

        /// <summary>
        /// UserCreatedOk.
        /// </summary>
        UserCreatedOk = 129,

        /// <summary>
        /// ClientCreatedOk.
        /// </summary>
        ClientCreatedOk = 130,

        /// <summary>
        /// ErrorGeneral.
        /// </summary>
        ErrorGeneral = 131,

        /// <summary>
        /// ClienteNoExiste.
        /// </summary>
        ClienteNoExiste = 132,

        /// <summary>
        /// CuentaNoExiste.
        /// </summary>
        CuentaNoExiste = 133,

        /// <summary>
        /// SaldoInsuficiente.
        /// </summary>
        SaldoInsuficiente = 134,

        /// <summary>
        /// UserActivateOk.
        /// </summary>
        UserActivateOk = 135,

        /// <summary>
        /// ActivationCodeExpired.
        /// </summary>
        ActivationCodeExpired = 136,

        /// <summary>
        /// Send And Save PDI
        /// </summary>
        CountryUpdateOK = 137,

        /// <summary>
        /// StateUpdateOK.
        /// </summary>
        StateUpdateOK = 138,

        /// <summary>
        /// PlanCreateOK.
        /// </summary>
        PlanCreateOK = 139,

        /// <summary>
        /// PlanAlreadyExist.
        /// </summary>
        PlanAlreadyExist = 140,

        /// <summary>
        /// PlanUpdateOk.
        /// </summary>
        PlanUpdateOk = 141,

        /// <summary>
        /// PlanDeleteOk.
        /// </summary>
        PlanDeleteOk = 142,

        /// <summary>
        /// SendAndSavePDI.
        /// </summary>
        SendAndSavePDI = 205,

        /// <summary>
        /// Send And Save PDI.
        /// </summary>
        SavePDI = 207,

        /// <summary>
        /// User Already Exist.
        /// </summary>
        UserAlreadyExist = 208,

        /// <summary>
        /// User Already calling
        /// </summary>
        UserCalling = 209,

        /// <summary>
        /// User Do Not Have Calls.
        /// </summary>
        UserDoNotHaveCalls = 210,

        /// <summary>
        /// Not Update Customer information.
        /// </summary>
        NotUpdateCustomerinformation = 211,

        /// <summary>
        /// User dont have PDI.
        /// </summary>
        UserWithoutPDI = 220,

        /// <summary>
        /// Out Of Service.
        /// </summary>
        OutOfService = 221,

        /// <summary>
        /// Not Update.
        /// </summary>
        NotUpdate = 222,

        /// <summary>
        /// Customer not exist.
        /// </summary>
        CustomerNotExist = 223,

        /// <summary>
        /// Activity Not Found.
        /// </summary>
        ActivityNotFound = 224,

        /// <summary>
        /// Payment not Found.
        /// </summary>
        PaymentNotFound = 225,

        /// <summary>
        /// Payment Error.
        /// </summary>
        PaymentStatusError = 226,

        /// <summary>
        /// Error Send Mail.
        /// </summary>
        ErrorSendMail = 300,

        /// <summary>
        /// Subsidy In Process.
        /// </summary>
        SubsidyRequestInProcess = 310,

        /// <summary>
        /// Have Not Subsidy Request.
        /// </summary>
        HaveNotSubsidyRequest = 320,

        /// <summary>
        /// User Have Not Subsidy Request.
        /// </summary>
        UserHaveNotSubsidyRequest = 330,

        /// <summary>
        /// User or Email not in Request.
        /// </summary>
        UserOrEmailNotRepuest = 400,

        /// <summary>
        /// Not Role Is Found.
        /// </summary>
        ErrorRequest = 401,

        /// <summary>
        /// Resurse not found.
        /// </summary>
        NotFound = 404,
    }
}