using AzureAuthApi.Features.AuditLogs.Dtos;

namespace AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;

public interface IAzureGraphAuditlogRest
{
    Task<SignInLogResponseDto[]> CallApiLogsLoginAsync();
    Task<DirectoryAuditsResponseDto[]> CallApiLogsDirectoryAuditsAsync();
}