namespace AzureAuthApi.Features.AuditLogs.Dtos;

public record struct SignInLogResponseDto
{
    public string UserPrincipalName { get; set; }
    public string AppDisplayName { get; set; }
    public string IpAddress { get; set; }
    public DateTime CreatedDateTime { get; set; }
}