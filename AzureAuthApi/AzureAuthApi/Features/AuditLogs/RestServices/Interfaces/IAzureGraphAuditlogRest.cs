using AzureAuthApi.Features.AuditLogs.Dtos;

namespace AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;

public interface IAzureGraphAuditlogRest
{
    Task<SignInLogResponseDto[]> CallApiLogsLoginAsync(CancellationToken cancellationToken);
    Task<DirectoryAuditsResponseDto[]> CallApiLogsDirectoryAuditsAsync(CancellationToken cancellationToken);
    Task<ProvisioningLogResponseDto[]> CallApiLogProvisioningAsync(CancellationToken cancellationToken);
}