namespace AzureAuthApi.Features.AuditLogs.Dtos;

public record DirectoryAuditsResponseDto(
    string Id,
    string Category,
    string CorrelationId,
    string Result,
    string ActivityDisplayName,
    string ActivityDateTime,
    string LoggedByService,
    string OperationType,
    InitiatedByResponseDto InitiatedBy,
    TargetResourcesResponseDto[] TargetResources,
    AdditionalDetailsResponseDto[] AdditionalDetails
);

public record InitiatedByResponseDto
{
    public UserResponseDto User { get; set; }
}

public record UserResponseDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string UserPrincipalName { get; set; }
}

public record TargetResourcesResponseDto(
    string Id,
    string DisplayName,
    string Type,
    string UserPrincipalName
);

public record AdditionalDetailsResponseDto(
    string Key,
    string Value
);


