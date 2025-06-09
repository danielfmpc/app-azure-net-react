using AzureAuthApi.Shared.Dtos;

namespace AzureAuthApi.Features.Me.RestServices.Interfaces;

public interface IAzureGraphMeRest
{
    Task<UserProfileDto> CallApiGetMeAsync(CancellationToken cancellationToken);
    Task<UserPhotoResponseDto> CallApiGetMePhotoAsync(CancellationToken cancellationToken);
}