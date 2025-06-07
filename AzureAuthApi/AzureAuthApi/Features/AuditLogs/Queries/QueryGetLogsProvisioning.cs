using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.AuditLogs.Queries;

public record struct QueryGetLogsProvisioning : IRequest<Result<IEnumerable<SignInLogResponseDto>>>;

public class QueryGetLogsProvisioningHandler(IAzureGraphAuditlogRest rest) : IRequestHandler<QueryGetLogsProvisioning, Result<IEnumerable<SignInLogResponseDto>>>
{
    public async Task<Result<IEnumerable<SignInLogResponseDto>>> Handle(QueryGetLogsProvisioning request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}