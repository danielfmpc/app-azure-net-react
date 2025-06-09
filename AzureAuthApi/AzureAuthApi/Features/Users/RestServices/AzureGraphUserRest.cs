using AzureAuthApi.Features.Users.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using AzureAuthApi.Shared.Entties;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace AzureAuthApi.Features.Users.RestServices;

public class AzureGraphUserRest(IHttpClientFactory httpClientFactory, ILogger<AzureGraphUserRest> logger) 
    : IAzureGraphUserRest
{
    private readonly HttpClient _client = httpClientFactory.CreateClient("MeuCliente");

    public async Task<UserProfileDto[]> CallApiListUsersAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("users", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        logger.LogInformation("Dados recebidos: {Json}", json);

        var users = JsonConvert.DeserializeObject<GraphListResponse<UserProfileDto>>(json);
        
        return users.Value.ToArray();
    }
    
    public async Task<UserProfileDto> CallApiUsersByIdAsync(string id, CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync($"users/{id}", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            return null;
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        logger.LogInformation("Dados recebidos: {Json}", json);

        var user = JsonConvert.DeserializeObject<UserProfileDto>(json);
        
        return user;
    }
}