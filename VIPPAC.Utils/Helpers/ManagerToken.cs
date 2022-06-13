﻿namespace VIPPAC.Utils.Helpers
{
    using System;
    using System.Globalization;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;

    /// <summary>
    /// Manager Token Class
    /// </summary>
    public static class ManagerToken
    {
        /// <summary>
        /// Generates the token.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <returns></returns>
        public static string GenerateToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, username),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString(CultureInfo.CurrentCulture)),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddMinutes(60)).ToUnixTimeSeconds().ToString(CultureInfo.CurrentCulture))
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("the secret code.")),
                    SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}