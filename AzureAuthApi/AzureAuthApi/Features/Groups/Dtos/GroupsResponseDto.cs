namespace AzureAuthApi.Features.Groups.Dtos;

public record struct GroupsResponseDto
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Description { get; set; }
    public string Mail { get; set; }
    public DateTime CreatedDateTime { get; set; }
}