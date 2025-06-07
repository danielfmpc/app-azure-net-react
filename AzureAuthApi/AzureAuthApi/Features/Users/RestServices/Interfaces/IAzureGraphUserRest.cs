using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Users.RestServices.Interfaces;

public interface IAzureGraphUserRest
{
    Task<UserProfileDto[]> CallApiListUsersAsync();
    Task<UserProfileDto> CallApiUsersByIdAsync(string id);
}