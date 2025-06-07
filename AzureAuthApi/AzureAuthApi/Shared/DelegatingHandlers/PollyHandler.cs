using AzureAuthApi.Shared.Polly;
using Polly;

namespace AzureAuthApi.Shared.DelegatingHandlers;

public class PollyHandler(ILogger<PollyHandler> logger) : DelegatingHandler
{
    private readonly IAsyncPolicy<HttpResponseMessage> _policy = PollyPolicies.GetPolicyWrap(logger);

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        return _policy.ExecuteAsync(ct => base.SendAsync(request, ct), cancellationToken);
    }
}