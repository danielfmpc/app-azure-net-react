namespace AzureAuthApi.Features.AuditLogs.Dtos;

public record ProvisioningLogResponseDto(
    string Id,
    string ActivityDateTime,
    string ChangeId,
    string CycleId,
    string ProvisioningAction,
    ProvisioningInitiatedByResponseDto InitiatedBy,
    ProvisioningStatusResponseDto Status,
    ProvisioningSourceIdentityResponseDto SourceIdentity,
    ProvisioningTargetIdentityResponseDto TargetIdentity,
    ProvisioningStepsResponseDto[] ProvisioningSteps
);

public record ProvisioningInitiatedByResponseDto(App App);

public record App(string DisplayName, string AppId);

public record ProvisioningStatusResponseDto(string Status);

public record Details(string Key, string Value);

public record ProvisioningSourceIdentityResponseDto(
    string Id,
    string DisplayName,
    Details[] Details
);

public record ProvisioningTargetIdentityResponseDto(
    string Id,
    string DisplayName,
    Details[] Details
);


public record ProvisioningStepsResponseDto(string Name, string Status);

