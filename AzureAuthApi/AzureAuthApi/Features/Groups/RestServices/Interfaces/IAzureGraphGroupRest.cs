using AzureAuthApi.Features.Groups.Dtos;

namespace AzureAuthApi.Features.Groups.RestServices.Interfaces;

public interface IAzureGraphGroupRest
{
    Task<GroupsResponseDto[]> CallApiListGroupsAsync();
    Task<GroupsResponseDto[]> CallApiMemberGroupByIdAsync(string groupId);

}