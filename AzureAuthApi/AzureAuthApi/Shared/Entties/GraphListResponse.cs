namespace AzureAuthApi.Shared.Entties;

public class GraphListResponse<T>
{
    public T[] Value { get; set; } = [];
}