using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Shared.Model;

namespace InsurancePolicyDashboard.Filters;

public class ApplicationExceptionFilter : IExceptionFilter
{
    private readonly ILogger<ApplicationExceptionFilter> _logger;

    public ApplicationExceptionFilter(ILogger<ApplicationExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, context.Exception.Message);
        switch (context.Exception)
        {
            default:
                context.HttpContext.Response.StatusCode = 500;
                break;
        }

        context.Result = new ObjectResult(new ErrorModel(context.Exception.Message));
    }
}