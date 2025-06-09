using System.Net.Http.Headers;
using Microsoft.Identity.Client;

namespace AzureAuthApi.Shared.DelegatingHandlers;

public class AccessTokenHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IConfidentialClientApplication _msalClient;
    private readonly string[] _graphScopes = ["https://graph.microsoft.com/.default"];

    public AccessTokenHandler(IHttpContextAccessor httpContextAccessor, IConfiguration config)
    {
        _httpContextAccessor = httpContextAccessor;

        var tenantId = config["AzureAd:TenantId"];
        var clientId = config["AzureAd:ClientId"];
        var clientSecret = config["AzureAd:ClientSecret"];

        _msalClient = ConfidentialClientApplicationBuilder.Create(clientId)
            .WithClientSecret(clientSecret)
            .WithAuthority(AzureCloudInstance.AzurePublic, tenantId)
            .Build();
    }

    
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {

        var frontendToken = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
    
        Console.WriteLine($"Authorization Header: {frontendToken}");


        if (!string.IsNullOrEmpty(frontendToken) && frontendToken.StartsWith("Bearer "))
        {
            var userAssertion = new UserAssertion(frontendToken["Bearer ".Length..]);
        
            try
            {
                var result = await _msalClient.AcquireTokenOnBehalfOf(_graphScopes, userAssertion)
                    .ExecuteAsync(cancellationToken);
                
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        
        }

        return await base.SendAsync(request, cancellationToken);
    }
}