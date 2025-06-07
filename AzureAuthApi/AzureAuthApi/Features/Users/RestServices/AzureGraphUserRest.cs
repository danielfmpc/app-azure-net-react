using System.Text.Json;
using AzureAuthApi.Features.Users.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Users.RestServices;

public class AzureGraphUserRest(HttpClient client, ILogger<AzureGraphUserRest> logger) 
    : IAzureGraphUserRest
{
    public async Task<UserProfileDto[]> CallApiListUsersAsync()
    {
        var response = await client.GetAsync("users"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);

        var users = JsonSerializer.Deserialize<UserProfileDto[]>(json);
        
        return users;
    }
    
    public async Task<UserProfileDto> CallApiUsersByIdAsync(string id)
    {
        var response = await client.GetAsync($"users/{id}"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            throw new Exception(msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);

        var user = JsonSerializer.Deserialize<UserProfileDto>(json);
        
        return user;
    }
}