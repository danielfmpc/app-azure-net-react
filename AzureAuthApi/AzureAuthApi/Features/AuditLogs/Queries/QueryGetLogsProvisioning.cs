using AzureAuthApi.Features.AuditLogs.Dtos;
using AzureAuthApi.Features.AuditLogs.RestServices.Interfaces;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.AuditLogs.Queries;

public record struct QueryGetLogsProvisioning : IRequest<Result<ProvisioningLogResponseDto[]>>;

public class QueryGetLogsProvisioningHandler(IAzureGraphAuditlogRest rest) : IRequestHandler<QueryGetLogsProvisioning, Result<ProvisioningLogResponseDto[]>>
{
    public async Task<Result<ProvisioningLogResponseDto[]>> Handle(QueryGetLogsProvisioning request, CancellationToken cancellationToken)
    {
        var result = await rest.CallApiLogProvisioningAsync(cancellationToken);

        if (result.Length <= 0)
            return Result.Fail("Not found logs Provisioning");
        
        return Result.Ok(result);
    }
}