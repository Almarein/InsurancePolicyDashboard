using Shared.Model;

namespace Shared.Interfaces;

public interface IPolicyService
{
    Task<List<Policy>> GetPolicies();
    Task AddPolicy(Policy policy);
}