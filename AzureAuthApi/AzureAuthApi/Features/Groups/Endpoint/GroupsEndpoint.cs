using AzureAuthApi.Features.AuditLogs.Queries;
using AzureAuthApi.Features.Groups.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthApi.Features.Groups.Endpoint;

public static class GroupsEndpoint
{
    public static void MapGroupsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/groups", [Authorize] async (
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        ) =>
        {
            var query = new QueryGetListGroups();
            var result = await mediator.Send(query, cancellationToken);

            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });

        endpoints.MapGet("/groups/{groupId}/members", [Authorize] async (
            string groupId,
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        ) =>
        {
            var query = new QueryGetGroupById(groupId);

            var result = await mediator.Send(query, cancellationToken);

            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
    }
}