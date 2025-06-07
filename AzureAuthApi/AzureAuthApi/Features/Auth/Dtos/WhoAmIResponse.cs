namespace AzureAuthApi.Features.Auth.Dtos;

public record struct WhoAmIResponse(string Id, string Name, string Email);