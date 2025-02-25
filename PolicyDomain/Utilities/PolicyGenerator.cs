using System.Text;
using Shared.Model;

namespace PolicyDomain.Utilities;

public class PolicyGenerator
{
    private const string Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private readonly string[] _policyTypes;
    private readonly string[] _statuses = ["Active", "Expired", "Cancelled"];
    private readonly Random _random = new ();

    public PolicyGenerator(int policyTypeCount)
    {
        _policyTypes = new string[policyTypeCount];
        for (var i = 0; i < policyTypeCount; i++)
        {
            _policyTypes[i] = GenerateRandomString(5);
        }
    }
    
    public IEnumerable<Policy> Generate(int amount)
    {
        for (var i = 0; i < amount; i++)
        {
            yield return Generate();
        }
    }
    
    public Policy Generate()
    {
        var startDate = GenerateRandomDate();
        return new Policy
        {
            PolicyNumber = GenerateRandomString(10),
            PolicyHolder = GenerateRandomString(20),
            PolicyType = _policyTypes[_random.Next(_policyTypes.Length)],
            PremiumAmount = _random.Next(1000, 10000),
            Status = _statuses[_random.Next(_statuses.Length)],
            StartDate = startDate,
            EndDate = startDate.AddYears(1).AddDays(-1)
        };
    }

    private DateTime GenerateRandomDate()
    {
        var year = _random.Next(2015, 2026);
        var month = _random.Next(1, 13);
        var day = _random.Next(1, 28);
        return new DateTime(year, month, day);
    }

    private string GenerateRandomString(int length)
    {
        var builder = new StringBuilder();
        for (var i = 0; i < length; i++)
        {
            builder.Append(Characters[_random.Next(Characters.Length)]);
        }
        return builder.ToString();
    }
}