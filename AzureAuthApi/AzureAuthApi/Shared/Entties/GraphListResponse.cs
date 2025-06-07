namespace AzureAuthApi.Shared.Entties;

public class GraphListResponse<T>
{
    public List<T> Value { get; set; } = [];
}