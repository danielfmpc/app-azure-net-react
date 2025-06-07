using Polly;
using Polly.Extensions.Http;

namespace AzureAuthApi.Shared.Polly;

public static class PollyPolicies
{
     private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy(ILogger logger)
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryCount, context) =>
                {
                    logger.LogWarning(
                        "[Retry] Tentativa {RetryCount}, aguardando {Delay}s. Erro: {Error}",
                        retryCount,
                        timespan.TotalSeconds,
                        outcome.Exception?.Message ?? outcome.Result?.StatusCode.ToString()
                    );
                });
    }

    private static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy(ILogger logger)
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(
                handledEventsAllowedBeforeBreaking: 2,
                durationOfBreak: TimeSpan.FromSeconds(10),
                onBreak: (outcome, breakDelay) =>
                {
                    logger.LogError(
                        "[CircuitBreaker] Abrindo circuito por {BreakDuration}s. Erro: {Error}",
                        breakDelay.TotalSeconds,
                        outcome.Exception?.Message ?? outcome.Result?.StatusCode.ToString()
                    );
                },
                onReset: () =>
                {
                    logger.LogInformation("[CircuitBreaker] Circuito fechado. Serviço normalizado.");
                },
                onHalfOpen: () =>
                {
                    logger.LogInformation("[CircuitBreaker] Circuito meio-aberto. Realizando chamada de teste.");
                });
    }

    public static IAsyncPolicy<HttpResponseMessage> GetPolicyWrap(ILogger logger)
    {
        return Policy.WrapAsync(
            GetRetryPolicy(logger),
            GetCircuitBreakerPolicy(logger)
        );
    }
}