namespace AzureAuthApi.Shared.Dtos;

public record UserPhotoResponseDto(
    string Id,
    string Photo,
    string Height,
    string Width
);