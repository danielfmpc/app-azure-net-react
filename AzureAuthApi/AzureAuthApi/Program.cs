using AzureAuthApi.Features.AuditLogs.Endpoint;
using AzureAuthApi.Features.AuditLogs.RestServices;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using AzureAuthApi.Features.Auth.Endpoint;
using AzureAuthApi.Features.Groups.Endpoint;
using AzureAuthApi.Features.Groups.RestServices;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using AzureAuthApi.Features.Me.Endpoint;
using AzureAuthApi.Features.Me.RestServices;
using AzureAuthApi.Features.Me.RestServices.Interfaces;
using AzureAuthApi.Features.Users.Endpoint;
using AzureAuthApi.Features.Users.RestServices;
using AzureAuthApi.Features.Users.RestServices.Interfaces;
using AzureAuthApi.Shared.DelegatingHandlers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly)
);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Services.AddLogging();
builder.Services.AddSerilog();

builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<PollyHandler>();

builder.Services.AddTransient<AccessTokenHandler>();

builder.Services.AddHttpClient("MeuCliente", client =>
    {
        client.BaseAddress = new Uri("https://graph.microsoft.com/v1.0/");
    })
    .AddHttpMessageHandler<PollyHandler>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IAzureGraphAuditlogRest,AzureGraphAuditlogRest>();
builder.Services.AddScoped<IAzureGraphGroupRest,AzureGraphGroupRest>();
builder.Services.AddScoped<IAzureGraphMeRest,AzureGraphMeRest>();
builder.Services.AddScoped<IAzureGraphUserRest,AzureGraphUserRest>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapAuditsLogsEndpoint();
app.MapGroupsEndpoint();
app.MapUserEndpoint();
app.MapWhoAmI();
app.MapMe();


app.Run();