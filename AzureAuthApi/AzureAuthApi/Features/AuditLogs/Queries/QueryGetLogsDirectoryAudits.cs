using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.AuditLogs.Queries;

public record struct QueryGetLogsDirectoryAudits : IRequest<Result<DirectoryAuditsResponseDto[]>>;

public class QueryGetLogsDirectoryAuditsHandler(IAzureGraphAuditlogRest rest) : IRequestHandler<QueryGetLogsDirectoryAudits, Result<DirectoryAuditsResponseDto[]>>
{
    public async Task<Result<DirectoryAuditsResponseDto[]>> Handle(QueryGetLogsDirectoryAudits request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiLogsDirectoryAuditsAsync(cancellationToken);

        if (result.Length <= 0)
            return Result.Fail("No logs Directory Audit found");
        
        return Result.Ok(result);
    }
}