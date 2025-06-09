using System.Net;
using Azure.Identity;
using Microsoft.Graph;
using AzureAuthApi.Features.Me.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace AzureAuthApi.Features.Me.RestServices;

public class AzureGraphMeRest(IHttpClientFactory httpClientFactory, ILogger<AzureGraphMeRest> logger)
    : IAzureGraphMeRest
{
    
    private readonly HttpClient _client = httpClientFactory.CreateClient("MeuCliente");

    public async Task<UserProfileDto> CallApiGetMeAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("me", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);

        var profile = JsonConvert.DeserializeObject<UserProfileDto>(json);
        
        return profile;
    }
    
    public async Task<UserPhotoResponseDto> CallApiGetMePhotoAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("me/photo", cancellationToken); 
        
        if (response.StatusCode == HttpStatusCode.NotFound)
            return null;
        
        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);

        var profile = JsonSerializer.Deserialize<UserPhotoResponseDto>(json);
        
        return profile;
    }
}
