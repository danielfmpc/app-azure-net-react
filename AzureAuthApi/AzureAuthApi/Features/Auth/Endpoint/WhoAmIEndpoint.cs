using System.Security.Claims;
using AzureAuthApi.Features.Auth.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthApi.Features.Auth.Endpoint;

public static class WhoAmIEndpoint
{
    public static void MapWhoAmI(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/auth/whoami", [Authorize] async (
            ClaimsPrincipal user,
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        ) =>
        {
            var query = new QueryGetWhoAmI(user);
            var result = await mediator.Send(query, cancellationToken);

            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
    }
}