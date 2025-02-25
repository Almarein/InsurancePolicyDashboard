using Microsoft.AspNetCore.Mvc;
using PolicyDomain.Utilities;
using Shared.Interfaces;
using Shared.Model;

namespace InsurancePolicyDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UtilityController(IPolicyService policyService) : ControllerBase
{
    [HttpPost("generate")]
    public async Task<IActionResult> GenerateInsurancePolicies()
    {
        foreach (var policy in new PolicyGenerator(4).Generate(1000))
        {
            await policyService.AddPolicy(policy);
        }

        return Ok();
    }

    [HttpGet("topPolicyTypes/{count:int}")]
    public IActionResult GetTopPolicyTypes(int count, [FromBody] IEnumerable<Policy> policies)
    {
        var determiner = new TopPolicyTypesDeterminer(policies);
        return Ok(determiner.GetTopPolicyTypes(count));
    }
}