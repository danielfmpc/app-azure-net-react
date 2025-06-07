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
            [FromServices]IMediator mediator
        ) =>
        {
            var query = new QueryGetWhoAmI();
            var result = await mediator.Send(query);
        
            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        })
        .WithName("WhoAmI")
        .WithTags("Auth");
    }
}