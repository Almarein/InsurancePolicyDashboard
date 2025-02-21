namespace Shared.DbModel;

public class PolicyModel
{
    public int Id { get; set; }
    public string PolicyNumber { get; set; }
    public string PolicyHolder { get; set; }
    public string PolicyType { get; set; }
    public decimal PremiumAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; }
}