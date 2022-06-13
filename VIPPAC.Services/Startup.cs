// <copyright file="Startup.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace VIPPAC.Services
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;

    // using Microsoft.AspNetCore.Authentication;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;
    using Polly;
    using VIPPAC.Business;
    using VIPPAC.Contracts.Business;
    using VIPPAC.Contracts.Referentials;
    using VIPPAC.DataAccess.Referentials;
    using VIPPAC.Entities.Referentials;
    using VIPPAC.Entities.Tables;
    using VIPPAC.ExternalServices;

    /// <summary>
    /// .
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration">configuration.</param>
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        /// <summary>
        /// Gets .
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="app">app.</param>
        /// <param name="env">env.</param>
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            this.ConfigureCorsApp(ref app);
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // app.UseCors(x => x
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .SetIsOriginAllowed(origin => true) // allow any origin
            //    .AllowCredentials()); // allow credentials
            // app.UseCors(builder => builder
            //    .AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .AllowCredentials());
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Recibes Services");
            });
            app.UseAuthentication();
        }

        /// <summary>
        /// .
        /// </summary>
        /// <param name="services">services.</param>
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.DependencySettings(services);
            DependencyRepositories(services);
            this.DependencyExternalServices(services);
            DependencyBusiness(services);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "Jwt";
                options.DefaultChallengeScheme = "Jwt";
            }).AddJwtBearer("Jwt", options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,

                    // ValidAudience = "the audience you want to validate",
                    ValidateIssuer = false,

                    // ValidIssuer = "the isser you want to validate",
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("the secret code.")),
                    ValidateLifetime = true, // validate the expiration and not before values in the token
                    ClockSkew = TimeSpan.FromMinutes(15), // 15 minute tolerance for the expiration date
                };
            });

            // services.AddCors(options =>
            // {
            //    options.AddPolicy("CorsPolitic",
            //        builder => builder.AllowAnyOrigin()
            //            .AllowAnyMethod()
            //            .AllowAnyHeader()
            //            .AllowCredentials()
            //            .SetPreflightMaxAge(TimeSpan.FromSeconds(2520)).Build());
            // });
            // services
            // .AddCors(options =>
            // {
            //    options.AddPolicy("CorsPolicy",
            //        builder => builder
            //        .AllowAnyOrigin()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        );

            // options.AddPolicy("signalr",
            //        builder => builder
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()

            // .AllowCredentials()
            //        .SetIsOriginAllowed(hostName => true));
            // });
            // services.AddCors();
            services.AddControllers();
            services.AddMvc();
            this.ConfigureCorsService(ref services);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Recibes Services", Version = "v1" });

                // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                // var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                // c.IncludeXmlComments(xmlPath);
            });
        }

        /// <summary>
        /// Method to register Dependency Business Logic.
        /// </summary>
        /// <param name="services">services.</param>
        private static void DependencyBusiness(IServiceCollection services)
        {
            services.AddTransient<ISecurityBl, SecurityBl>();
            services.AddTransient<ICustomerBl, CustomerBl>();
            services.AddTransient<IPackerGeolocationBl, PackerGeolocationBl>();
            services.AddTransient<ICountryBl, CountryBl>();
            services.AddTransient<IParametersBI, ParameterBI>();
            services.AddTransient<IPackageBl, PackageBl>();
            services.AddTransient<IRateBl, RateBl>();
            services.AddTransient<IPlansBl, PlansBl>();
            services.AddTransient<IHoliDaysBl, HolidaysBl>();
            services.AddTransient<IPaymentBl, PaymentBl>();
        }

        /// <summary>
        /// Method to register Dependency Repositories.
        /// </summary>
        /// <param name="services">services.</param>
        private static void DependencyRepositories(IServiceCollection services)
        {
            // Carga las dependencias
            services.AddSingleton<IGenericRep<User>, TableStorageBase<User>>();
            services.AddSingleton<IGenericRep<GeolocalizacionPacker>, TableStorageBase<GeolocalizacionPacker>>();
            services.AddSingleton<IGenericRep<Log>, TableStorageBase<Log>>();
            services.AddSingleton<IGenericRep<Country>, TableStorageBase<Country>>();
            services.AddSingleton<IGenericRep<State>, TableStorageBase<State>>();
            services.AddSingleton<IGenericRep<City>, TableStorageBase<City>>();
            services.AddSingleton<IGenericRep<Customer>, TableStorageBase<Customer>>();
            services.AddSingleton<IGenericRep<Parameter>, TableStorageBase<Parameter>>();
            services.AddSingleton<IGenericRep<RegPackage>, TableStorageBase<RegPackage>>();
            services.AddSingleton<IGenericRep<RegPackageAddress>, TableStorageBase<RegPackageAddress>>();
            services.AddSingleton<IGenericRep<TransportType>, TableStorageBase<TransportType>>();
            services.AddSingleton<IGenericRep<CustomerLocation>, TableStorageBase<CustomerLocation>>();
            services.AddSingleton<IGenericRep<CustomerActivation>, TableStorageBase<CustomerActivation>>();
            services.AddSingleton<IGenericRep<PackageType>, TableStorageBase<PackageType>>();
            services.AddSingleton<IGenericRep<PaymentDetail>, TableStorageBase<PaymentDetail>>();
            services.AddSingleton<IGenericRep<Payment>, TableStorageBase<Payment>>();
            services.AddSingleton<IGenericRep<Packer>, TableStorageBase<Packer>>();
            services.AddSingleton<IGenericRep<TransportTypeCharacteristics>, TableStorageBase<TransportTypeCharacteristics>>();
            services.AddSingleton<IGenericRep<PricebyCitybyTOT>, TableStorageBase<PricebyCitybyTOT>>();
            services.AddSingleton<IGenericRep<Plans>, TableStorageBase<Plans>>();
            services.AddSingleton<IGenericRep<CustomerPlans>, TableStorageBase<CustomerPlans>>();
            services.AddSingleton<IGenericRep<PrivatePlansCustomer>, TableStorageBase<PrivatePlansCustomer>>();
            services.AddSingleton<IGenericRep<HoliDays>, TableStorageBase<HoliDays>>();
            services.AddSingleton<IGenericRep<Tips>, TableStorageBase<Tips>>();
            services.AddSingleton<IGenericRep<EmailType>, TableStorageBase<EmailType>>();
            services.AddSingleton<IGenericRep<PackbyTOT>, TableStorageBase<PackbyTOT>>();
            services.AddSingleton<IGenericRep<Products>, TableStorageBase<Products>>();
            services.AddSingleton<IGenericRep<EnterprisebyProduct>, TableStorageBase<EnterprisebyProduct>>();
        }

        private void ConfigureCorsApp(ref IApplicationBuilder app)
        {
            app.UseCors("CorsPolicy");

            // app.UseCors(x => x
            //   .AllowAnyMethod()
            //   .AllowAnyHeader()
            //   .SetIsOriginAllowed(origin => true) // allow any origin
            //   .AllowCredentials()); // allow credentials
        }

        // private static void DependencyExternalServices(IServiceCollection services)
        // {
        //    //services.AddTransient<ISendGridExternalService, SendGridExternalService>();
        //    //services.AddTransient<IOpenTokExternalService, OpenTokExternalService>();
        //    //services.AddTransient<ILdapServices, LdapServices>();
        //    //services.AddTransient<IPdfConvertExternalService, PDFConvertExternalService>();
        // }
        private void ConfigureCorsService(ref IServiceCollection services)
        {
            // enables CORS and httpoptions
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.SetIsOriginAllowed(origin => true); // allow any origin
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                });
            });

            // services.AddCors();
        }

        private void DependencyExternalServices(IServiceCollection services)
        {
            services.AddHttpClient("Wampi")
                .AddTypedClient<WampiService>()
                .ConfigureHttpClient(client =>
                {
                    client.BaseAddress = new Uri(this.Configuration.GetValue<string>("Services:Wampi"));
                })
                .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromMilliseconds(this.Configuration.GetValue<int>("RetryDelay"))));
        }

        /// <summary>
        /// Method to register Dependency Settings.
        /// </summary>
        /// <param name="services">services.</param>
        private void DependencySettings(IServiceCollection services)
        {
            services.Configure<AppSettings>(opt => this.Configuration.GetSection("AppSettings").Bind(opt));
            services.Configure<SendMailData>(opt => this.Configuration.GetSection("SendMailData").Bind(opt));
            services.Configure<List<ServiceSettings>>(opt => this.Configuration.GetSection("ServiceSettings").Bind(opt));
            services.Configure<UserSecretSettings>(this.Configuration);
        }
    }
}