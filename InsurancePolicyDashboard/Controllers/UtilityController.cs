using Microsoft.AspNetCore.Mvc;
using PolicyDomain.Utilities;
using Shared.Interfaces;

namespace InsurancePolicyDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UtilityController(IPolicyService policyService) : ControllerBase
{
    [HttpPost("generate")]
    public async Task<IActionResult> GenerateInsurancePolicies()
    {
        var policyGenerator = new PolicyGenerator();
        for (var i = 0; i < 1000; i++)
        {
            await policyService.AddPolicy(policyGenerator.Generate());
        }

        return Ok();
    }
}