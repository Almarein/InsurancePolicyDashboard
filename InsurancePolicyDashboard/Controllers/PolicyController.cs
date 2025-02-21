using Microsoft.AspNetCore.Mvc;
using Shared.Interfaces;
using Shared.Model;

namespace InsurancePolicyDashboard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PolicyController(IPolicyService policyService)
    : ControllerBase
{
    [HttpGet("list")]
    public async Task<IActionResult> GetList()
    {
        return Ok(await policyService.GetPolicies());
    }

    [HttpPost]
    public async Task<IActionResult> CreatePolicy([FromBody] Policy policy)
    {
        await policyService.AddPolicy(policy);
        return Ok();
    }
}