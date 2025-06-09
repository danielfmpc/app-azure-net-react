using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.AuditLogs.Queries;

public record struct QueryGetLogsLogin : IRequest<Result<SignInLogResponseDto[]>>;

public class QueryGetLogsLoginHandler(IAzureGraphAuditlogRest rest) : IRequestHandler<QueryGetLogsLogin, Result<SignInLogResponseDto[]>>
{
    public async Task<Result<SignInLogResponseDto[]>> Handle(QueryGetLogsLogin request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiLogsLoginAsync(cancellationToken);

        if (result.Length == 0)
            return Result.Fail("Not found logs login");
        
        return Result.Ok(result);
    }
}