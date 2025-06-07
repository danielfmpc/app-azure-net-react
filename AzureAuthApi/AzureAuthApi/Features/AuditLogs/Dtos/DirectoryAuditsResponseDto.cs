namespace AzureAuthApi.Features.AuditLogs.Dtos;

public record struct DirectoryAuditsResponseDto
{
    public string ActivityDisplayName { get; set; }
    public InitiatedByResponseDto InitiatedBy { get; set; }
    public DateTime ActivityDateTime { get; set; }
}

public record struct InitiatedByResponseDto
{
    public UserResponseDto User { get; set; }
}

public record struct UserResponseDto
{
    public string DisplayName { get; set; }
}