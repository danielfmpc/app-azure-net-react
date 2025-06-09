using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using AzureAuthApi.Shared.Dtos;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Groups.Queries;

public record struct QueryGetGroupById(string GroupId) : IRequest<Result<UserProfileDto[]>>;

public class QueryGetGroupByIdHandler(IAzureGraphGroupRest rest) : IRequestHandler<QueryGetGroupById, Result<UserProfileDto[]>>
{
    public async Task<Result<UserProfileDto[]>> Handle(QueryGetGroupById request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiMemberGroupByIdAsync(request.GroupId, cancellationToken);
        
        if (result.Length == 0)
            return Result.Fail("Not found group members");
        
        return Result.Ok(result);
    }
}