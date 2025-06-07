namespace AzureAuthApi.Features.Groups.Dtos;

public record struct GroupsResponseDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string UserPrincipalName { get; set; }
    public string Mail { get; set; }
}