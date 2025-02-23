using Shared.DbModel;

namespace Shared.Model;

public class Policy
{
    public Policy()
    {
    }

    public Policy(PolicyModel policy)
    {
        PolicyNumber = policy.PolicyNumber;
        PolicyHolder = policy.PolicyHolder;
        PolicyType = policy.PolicyType;
        PremiumAmount = policy.PremiumAmount;
        StartDate = policy.StartDate;
        EndDate = policy.EndDate;
        Status = policy.Status;
    }

    public string PolicyNumber { get; set; }
    public string PolicyHolder { get; set; }
    public string PolicyType { get; set; }
    public decimal PremiumAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; }

    public PolicyModel GetDbModel()
    {
        return new PolicyModel
        {
            PolicyNumber = PolicyNumber,
            PolicyHolder = PolicyHolder,
            PolicyType = PolicyType,
            PremiumAmount = PremiumAmount,
            StartDate = StartDate,
            EndDate = EndDate,
            Status = Status
        };
    }
}