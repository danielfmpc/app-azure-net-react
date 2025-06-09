using AzureAuthApi.Features.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthApi.Features.Users.Endpoint;

public static class UserEndpoint
{
    public static void MapUserEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/users", [Authorize] async (
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        ) =>
        {
            var query = new QueryGetListUsers();
            var result = await mediator.Send(query, cancellationToken);

            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });

        endpoints.MapGet("/users/{userId}", [Authorize] async (
            string userId,
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        ) =>
        {
            var query = new QueryGetUsersById(userId);
            var result = await mediator.Send(query, cancellationToken);

            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
    }
}