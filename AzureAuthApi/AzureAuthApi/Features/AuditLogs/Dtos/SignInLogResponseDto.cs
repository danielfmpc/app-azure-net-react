namespace AzureAuthApi.Features.AuditLogs.Dtos;

public record struct SignInLogResponseDto
{
    public string Id { get; set; }
    public string UserPrincipalName { get; set; }
    public string AppDisplayName { get; set; }
    public DateTime CreatedDateTime { get; set; }
    public SignInLogStatusResponseDto Status { get; set; }
    public string IpAddress { get; set; }
    public string ClientAppUsed { get; set; }
    public SignInLogLocationResponseDto Location { get; set; }
}

public record struct SignInLogStatusResponseDto
{
    public int ErrorCode { get; set; }
    public string FailureReason { get; set; }
    
}

public record struct SignInLogLocationResponseDto
{
    public string City { get; set; }
    public string CountryorRegion { get; set; }
    
}
