using System.Text.Json;
using Azure.Identity;
using Microsoft.Graph;
using AzureAuthApi.Features.Me.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Me.RestServices;

public class AzureGraphMeRest(HttpClient client, ILogger<AzureGraphMeRest> logger) : IAzureGraphMeRest
{
    public async Task<UserProfileDto> CallApiGetMeAsync()
    {
        var response = await client.GetAsync("/me"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);

        var profile = JsonSerializer.Deserialize<UserProfileDto>(json);
        
        return profile;
    }
    
    public async Task<UserPhotoResponseDto> CallApiGetMePhotoAsync()
    {
        var response = await client.GetAsync("/me/photo"); // Exemplo: pegar info do usuário logado

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
