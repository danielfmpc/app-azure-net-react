using AzureAuthApi.Features.Me.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Me.Queries;

public record struct QueryGetMe : IRequest<Result<UserProfileDto>>;

public class QueryGetMeByIdHandler(IAzureGraphMeRest rest) : IRequestHandler<QueryGetMe, Result<UserProfileDto>>
{
    public async Task<Result<UserProfileDto>> Handle(QueryGetMe request, CancellationToken cancellationToken)
    {
        var profileMe = await rest.CallApiGetMeAsync(cancellationToken);
        
        if (profileMe == null) return Result.Fail("User not found");
        
        var profilePhoto = await rest.CallApiGetMePhotoAsync(cancellationToken);
        
        profileMe.Photo = profilePhoto;
        
        return Result.Ok(profileMe);
    }
}