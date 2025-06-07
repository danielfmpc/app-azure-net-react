using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Me.RestServices.Interfaces;

public interface IAzureGraphMeRest
{
    Task<UserProfileDto> CallApiGetMeAsync();
    Task<UserPhotoResponseDto> CallApiGetMePhotoAsync();
}