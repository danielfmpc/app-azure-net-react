using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using AzureAuthApi.Shared.Entties;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace AzureAuthApi.Features.AuditLogs.RestServices;

public class AzureGraphAuditlogRest(
    IHttpClientFactory httpClientFactory,
    ILogger<AzureGraphAuditlogRest> logger
) : IAzureGraphAuditlogRest
{
    private readonly HttpClient _client = httpClientFactory.CreateClient("MeuCliente");

    public async Task<SignInLogResponseDto[]> CallApiLogsLoginAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("auditLogs/signIns", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);

            return [];
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);
        
        var listLogsLogin = JsonConvert.DeserializeObject<GraphListResponse<SignInLogResponseDto>>(json);

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
    
    public async Task<DirectoryAuditsResponseDto[]> CallApiLogsDirectoryAuditsAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("auditLogs/directoryAudits", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            return [];
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        var listDirectoryAudtis = JsonConvert.DeserializeObject<GraphListResponse<DirectoryAuditsResponseDto>>(json);
        

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listDirectoryAudtis.Value.ToArray();
    }
    
    public async Task<ProvisioningLogResponseDto[]> CallApiLogProvisioningAsync(CancellationToken cancellationToken)
    {
        var response = await _client.GetAsync("auditLogs/provisioning", cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var msg = await response.Content.ReadAsStringAsync(cancellationToken);
            logger.LogError("Erro: {StatusCode} - {Body}", response.StatusCode, msg);
            
            return [];
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        logger.LogInformation("Dados recebidos: {Json}", json);
        
        var listLogsLogin = JsonConvert.DeserializeObject<GraphListResponse<ProvisioningLogResponseDto>>(json);

        logger.LogInformation("Dados recebidos: {Json}", json);

        return listLogsLogin.Value.ToArray();
    }
}