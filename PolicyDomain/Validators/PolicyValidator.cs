using FluentValidation;
using Shared.Model;

namespace PolicyDomain.Validators;

public class PolicyValidator : AbstractValidator<Policy>
{
    public PolicyValidator()
    {
        RuleFor(p => p.PremiumAmount).GreaterThan(0).WithMessage("Premium amount must be greater than zero");
        RuleFor(p => p).Must(p => p.StartDate < p.EndDate).WithMessage("Start date must be before end date");
    }
}