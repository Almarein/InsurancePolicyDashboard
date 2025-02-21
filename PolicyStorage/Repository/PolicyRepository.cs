using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shared.Interfaces;
using Shared.Model;

namespace PolicyStorage.Repository;

public class PolicyRepository(IDbContextFactory<PolicyContext> contextFactory, ILogger<PolicyRepository> logger)
    : IPolicyRepository
{
    public async Task<List<Policy>> GetPolicies()
    {
        await using var context = await contextFactory.CreateDbContextAsync();
        return await context.Policies.Select(p => new Policy(p)).ToListAsync();
    }

    public async Task AddPolicy(Policy policy)
    {
        try
        {
            await using var context = await contextFactory.CreateDbContextAsync();
            context.Add(policy.GetDbModel());
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occured while saving a policy to the database");
            throw;
        }
    }
}