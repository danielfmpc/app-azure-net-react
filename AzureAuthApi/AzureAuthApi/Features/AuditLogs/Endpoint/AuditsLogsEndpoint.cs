using AzureAuthApi.Features.AuditLogs.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthApi.Features.AuditLogs.Endpoint;

public static class AuditsLogsEndpoint
{
    public static void MapAuditsLogsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("auditLogs/signIns", [Authorize] async (
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        )=>
        {
            var query = new QueryGetLogsLogin();
            var result = await mediator.Send(query, cancellationToken);
            return result.IsSuccess ?  Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
        
        endpoints.MapGet("auditLogs/directoryAudits", [Authorize] async (
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        )=> 
        {
            var query = new QueryGetLogsDirectoryAudits();
            var result = await mediator.Send(query, cancellationToken);
            return result.IsSuccess ?  Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
        
        endpoints.MapGet("auditLogs/provisioning", [Authorize] async (
            [FromServices] IMediator mediator,
            CancellationToken cancellationToken
        )=> 
        {
            var query = new QueryGetLogsProvisioning();
            
            var result = await mediator.Send(query, cancellationToken);
            
            return result.IsSuccess ?  Results.Ok(result.Value) : Results.BadRequest(result.Errors);
        });
    }
}