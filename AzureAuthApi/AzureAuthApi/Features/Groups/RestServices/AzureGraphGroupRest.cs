using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using AzureAuthApi.Shared.Entties;
using Newtonsoft.Json;

namespace AzureAuthApi.Features.Groups.RestServices;

public class AzureGraphGroupRest(IHttpClientFactory httpClientFactory, ILogger<AzureGraphGroupRest> logger)
    : IAzureGraphGroupRest
{
    private readonly HttpClient _client = httpClientFactory.CreateClient("MeuCliente");

    public async Task<GroupsResponseDto[]> CallApiListGroupsAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("groups", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);

            return null;
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);
        
        var listLogsLogin = JsonConvert.DeserializeObject<GraphListResponse<GroupsResponseDto>>(json);
        
        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
    
    public async Task<UserProfileDto[]> CallApiMemberGroupByIdAsync(string groupId, CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync($"groups/{groupId}/members", cancellationToken); 

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);

            return null;
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        var listLogsLogin = JsonConvert.DeserializeObject<GraphListResponse<UserProfileDto>>(json);

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
}