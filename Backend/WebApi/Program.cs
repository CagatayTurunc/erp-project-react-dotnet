using Autofac;
using Autofac.Extensions.DependencyInjection;
using Business.Abstract;
using Business.Concrete;
using Business.DependencyResolvers.Autofac;
using Business.ValidationRules.FluentValidation;
using Core.Utilities.Security.Encryption;
using Core.Utilities.Security.JWT;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. AUTOFAC YAPILANDIRMASINI EKLE ---
// Bu bölüm, .NET'e varsayılan DI sistemi yerine Autofac'i kullanmasını söyler
// ve bizim Business katmanındaki modülümüzü okumasını sağlar.
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(builder =>
    {
        builder.RegisterModule(new AutofacBusinessModule());
    });
// -----------------------------------------

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<UserForRegisterDtoValidator>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddDbContext<NorthwindContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ======================= CORS POLİTİKASI =======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder
            .WithOrigins("http://localhost:3000", "http://localhost:3001")
            .AllowAnyHeader()
            .AllowAnyMethod());
});
// ==============================================================

// JWT Ayarları
var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<TokenOptions>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = tokenOptions.Issuer,
            ValidAudience = tokenOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey)
        };
    });
builder.Services.AddAuthorization();

// --- 2. GEREKSİZ KAYITLARI KALDIR ---
// Bu servis kayıtları artık AutofacBusinessModule tarafından yönetildiği için
// burada tekrar edilmelerine gerek yoktur.
// builder.Services.AddScoped<IAuthService, AuthManager>();
// builder.Services.AddScoped<IUserService, UserManager>();
// builder.Services.AddScoped<IUserDal, EfUserDal>();
// builder.Services.AddScoped<ITokenHelper, JwtHelper>();
// builder.Services.AddScoped<ISalesOrderService, SalesOrderManager>();
// builder.Services.AddScoped<DataAccess.Abstract.ISalesOrderDal, EfSalesOrderDal>();
// builder.Services.AddScoped<IQuoteService, QuoteManager>(); // Bu da Autofac'e taşındı
// builder.Services.AddScoped<DataAccess.Abstract.IQuoteDal, EfQuoteDal>(); // Bu da Autofac'e taşındı

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// İkinci if bloğu gereksiz, bir tane yeterli.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --- 3. SEEDDATA ÇAĞRISINI DOĞRU YERE TAŞI ---
// Tüm yapılandırma bittikten sonra, uygulama çalışmadan hemen önce çağrılmalıdır.
Seed.SeedData(app);

app.Run();
