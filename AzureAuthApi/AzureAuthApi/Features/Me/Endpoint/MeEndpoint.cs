using AzureAuthApi.Features.Me.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthApi.Features.Me.Endpoint;

public static class MeEndpoint
{
    public static void MapMe(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/me", [Authorize] async (
            [FromServices]IMediator mediator
        ) =>
        {
            var query = new QueryGetMe();
            var result = await mediator.Send(query);
            
            return result.IsSuccess ? Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
    }
}