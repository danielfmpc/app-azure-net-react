using AzureAuthApi.Features.Users.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Users.Queries;

public record struct QueryGetUsersById(string Id) : IRequest<Result<UserProfileDto>>;

public class QueryGetUsersByIdHandler(IAzureGraphUserRest rest) : IRequestHandler<QueryGetUsersById, Result<UserProfileDto>>
{
    public async Task<Result<UserProfileDto>> Handle(QueryGetUsersById request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiUsersByIdAsync(request.Id, cancellationToken);
        
        if (result == null) return Result.Fail("User not found");
        
        return Result.Ok(result);
    }
}