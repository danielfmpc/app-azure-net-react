using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Groups.Queries;

public record struct QueryGetListGroups : IRequest<Result<GroupsResponseDto[]>>;

public class QueryGetListGroupsHandler(IAzureGraphGroupRest rest) : IRequestHandler<QueryGetListGroups, Result<GroupsResponseDto[]>>
{
    public async Task<Result<GroupsResponseDto[]>> Handle(QueryGetListGroups request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiListGroupsAsync(cancellationToken);

        if (result.Length <= 0)
            return Result.Fail("No logs Directory Audit found");
        
        return Result.Ok(result);
    }
}