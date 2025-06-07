using AzureAuthApi.Features.Groups.Dtos;
using AzureAuthApi.Features.Groups.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Groups.Queries;

public record struct QueryGetGroupById(string GroupId) : IRequest<Result<GroupsResponseDto[]>>;

public class QueryGetGroupByIdHandler(IAzureGraphGroupRest rest) : IRequestHandler<QueryGetGroupById, Result<GroupsResponseDto[]>>
{
    public async Task<Result<GroupsResponseDto[]>> Handle(QueryGetGroupById request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiMemberGroupByIdAsync(request.GroupId);

        var groupsResponseDtos = result as GroupsResponseDto[] ?? result.ToArray();
        if (!groupsResponseDtos.Any())
            return Result.Fail("No logs Directory Audit found");
        
        return Result.Ok(groupsResponseDtos);
    }
}