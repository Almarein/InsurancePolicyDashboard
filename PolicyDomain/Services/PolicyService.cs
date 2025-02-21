using Shared.Interfaces;
using Shared.Model;

namespace PolicyDomain.Services;

public class PolicyService(IPolicyRepository policyRepository) : IPolicyService
{
    public Task<List<Policy>> GetPolicies()
    {
        return policyRepository.GetPolicies();
    }

    public Task AddPolicy(Policy policy)
    {
        return policyRepository.AddPolicy(policy);
    }
}