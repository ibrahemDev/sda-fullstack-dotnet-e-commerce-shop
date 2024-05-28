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

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
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


builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
    Environment.GetEnvironmentVariable("DefaultConnection")
    ));

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<OrderItemService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<PaymentMethodService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<CategoriesService>();

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

var Configuration = builder.Configuration;
#pragma warning disable CS8604 // Possible null reference argument.
var key = Encoding.ASCII.GetBytes(
    Environment.GetEnvironmentVariable("Jwt_key")
    //Configuration["Jwt:Key"]
    );
#pragma warning restore CS8604 // Possible null reference argument.
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
        ValidIssuer = Environment.GetEnvironmentVariable("Jwt_Issuer"),//Configuration["Jwt:Issuer"],
        ValidAudience = Environment.GetEnvironmentVariable("Jwt_Audience"),//Configuration["Jwt:Audience"],//
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
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

builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();