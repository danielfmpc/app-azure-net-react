using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Groups.RestServices.Interfaces;

public interface IAzureGraphGroupRest
{
    Task<GroupsResponseDto[]> CallApiListGroupsAsync(CancellationToken cancellationToken);
    Task<UserProfileDto[]> CallApiMemberGroupByIdAsync(string groupId, CancellationToken cancellationToken);

}