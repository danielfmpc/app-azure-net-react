using System.Security.Claims;
using AzureAuthApi.Features.Auth.Dtos;
using FluentResults;
using MediatR;

namespace AzureAuthApi.Features.Auth.Queries;

public record struct QueryGetWhoAmI(ClaimsPrincipal User) : IRequest<Result<WhoAmIResponse>>;

public class QueryGetWhoAmIHandler : IRequestHandler<QueryGetWhoAmI, Result<WhoAmIResponse>>
{
    public Task<Result<WhoAmIResponse>> Handle(QueryGetWhoAmI request, CancellationToken cancellationToken)
    {
        ClaimsPrincipal user = request.User;
        
        string? id = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(id))
        {
            return Task.FromResult<Result<WhoAmIResponse>>(Result.Fail("User not found"));
        }
        
        string? name = user.FindFirstValue("name");
        if (string.IsNullOrWhiteSpace(name))
        {
            return Task.FromResult<Result<WhoAmIResponse>>(Result.Fail("Name not found"));
        }
        
        string? email = user.FindFirstValue(ClaimTypes.Email)
                        ?? user.FindFirstValue("preferred_username");
        if (string.IsNullOrWhiteSpace(email))
        {
            return Task.FromResult<Result<WhoAmIResponse>>(Result.Fail("Email not found"));
        }
        
        return Task.FromResult(Result.Ok(new WhoAmIResponse(id, name,email)));
    }
}