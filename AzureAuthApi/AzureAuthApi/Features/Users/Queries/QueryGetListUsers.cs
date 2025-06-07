using AzureAuthApi.Features.Users.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Users.Queries;

public record struct QueryGetListUsers : IRequest<Result<UserProfileDto[]>>;

public class QueryGetListUsersHandler(IAzureGraphUserRest rest) : IRequestHandler<QueryGetListUsers, Result<UserProfileDto[]>>
{
    public async Task<Result<UserProfileDto[]>> Handle(QueryGetListUsers request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiListUsersAsync();
        
        if (result.Length <= 0) return Result.Fail("User not found");
        
        return Result.Ok(result);
    }
}