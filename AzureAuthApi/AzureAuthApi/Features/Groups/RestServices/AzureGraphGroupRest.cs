using System.Text.Json;
using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using AzureAuthApi.Shared.Entties;

namespace AzureAuthApi.Features.Groups.RestServices;

public class AzureGraphGroupRest(HttpClient client, ILogger<AzureGraphGroupRest> logger) : IAzureGraphGroupRest
{
    public async Task<GroupsResponseDto[]> CallApiListGroupsAsync()
    {
        var response = await client.GetAsync("groups"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        
        var listLogsLogin = JsonSerializer.Deserialize<GraphListResponse<GroupsResponseDto>>(json);

        if (listLogsLogin == null)
        {
            return [];
        }

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
    
    public async Task<GroupsResponseDto[]> CallApiMemberGroupByIdAsync(string groupId)
    {
        var response = await client.GetAsync($"groups/{groupId}/members"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        var listLogsLogin = JsonSerializer.Deserialize<GraphListResponse<GroupsResponseDto>>(json);

        if (listLogsLogin == null)
        {
            return [];
        }

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
}