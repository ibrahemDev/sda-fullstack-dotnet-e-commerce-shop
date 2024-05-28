using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Store.Application.Services;
using Store.EntityFramework;
using Store.EntityFramework.Entities;
var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();


var jwtKey = Environment.GetEnvironmentVariable("Jwt_key") ?? throw new InvalidOperationException("JWT Key is missing in environment variables.");
var jwtIssuer = Environment.GetEnvironmentVariable("Jwt_Issuer") ?? throw new InvalidOperationException("JWT Issuer is missing in environment variables.");
var jwtAudience = Environment.GetEnvironmentVariable("Jwt_Audience") ?? throw new InvalidOperationException("JWT Audience is missing in environment variables.");






var Configuration = builder.Configuration;
var key = Encoding.ASCII.GetBytes(jwtKey);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtIssuer,//Configuration["Jwt:Issuer"],
        ValidAudience = jwtAudience,//Configuration["Jwt:Audience"],//
        ClockSkew = TimeSpan.Zero
    };
});




builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
    Environment.GetEnvironmentVariable("DefaultConnection")
    ));
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "https://variety-shop.netlify.app")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        }
    );
});


builder.Services.AddEndpointsApiExplorer();


if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Description = "Bearer Authentication with JWT Token",
            Type = SecuritySchemeType.Http
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
        });
    });
}

builder.Services.AddControllers();


builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<OrderItemService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<PaymentMethodService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<CategoriesService>();

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddAutoMapper(typeof(Program));
/*
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);*/

/*builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});*/


/*
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowOptions",
        builder =>
        {

            builder.WithOrigins(
              "*"
            ).WithMethods("GET", "POST", "DELETE", "PUT", "PATCH")
                   //.AllowAnyHeader()
                   .AllowAnyMethod();
        });
});*/
/*
builder.Services.AddCors(options =>
   {
       options.AddPolicy(name: "allowAll",
           builder =>
           {
               builder.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
           });
   });*/
/*
if (!builder.Environment.IsDevelopment())
{

}
else
{
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowOptions",
        builder =>
        {

            builder.WithOrigins(
              "https://variety-shop.netlify.app/", "https://variety-shop.netlify.app", "https://variety-shop.netlify.app/*"
            ).WithMethods("GET", "POST", "DELETE", "PUT", "PATCH")
                   //.AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
}
*/





// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle











/*

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowOptions",
        builder =>
        {
            builder.WithOrigins(
              "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});


*/



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();