using System.Text.Json;
using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using AzureAuthApi.Shared.Entties;

namespace AzureAuthApi.Features.AuditLogs.RestServices;

public class AzureGraphAuditlogRest(
    HttpClient client,
    ILogger<AzureGraphAuditlogRest> logger
) : IAzureGraphAuditlogRest
{
    public async Task<SignInLogResponseDto[]> CallApiLogsLoginAsync()
    {
        var response = await client.GetAsync("auditLogs/signIns"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        
        var listLogsLogin = JsonSerializer.Deserialize<GraphListResponse<SignInLogResponseDto>>(json);

        if (listLogsLogin == null)
        {
            return [];
        }

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
    
    public async Task<DirectoryAuditsResponseDto[]> CallApiLogsDirectoryAuditsAsync()
    {
        var response = await client.GetAsync("auditLogs/directoryAudits"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        var listDirectoryAudtis = JsonSerializer.Deserialize<GraphListResponse<DirectoryAuditsResponseDto>>(json);

        if (listDirectoryAudtis == null)
        {
            return [];
        }

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listDirectoryAudtis.Value.ToArray();
    }
    
    public async Task CallApiLogProvisioningAsync()
    {
        var response = await client.GetAsync("auditLogs/provisioning"); // Exemplo: pegar info do usuário logado

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync();
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();

        logger.LogInformation("Dados recebidos: {Json}", json);
    }
}