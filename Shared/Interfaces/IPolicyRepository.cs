using Shared.Model;

namespace Shared.Interfaces;

public interface IPolicyRepository
{
    Task<List<Policy>> GetPolicies();
    Task AddPolicy(Policy policy);
}