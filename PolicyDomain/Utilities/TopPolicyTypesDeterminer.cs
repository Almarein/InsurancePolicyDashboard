using Shared.Model;

namespace PolicyDomain.Utilities;

public class TopPolicyTypesDeterminer
{
    private readonly IDictionary<string, decimal> _totalPolicyAmountByType;

    public TopPolicyTypesDeterminer(IEnumerable<Policy> policies)
    {
        _totalPolicyAmountByType = GetTotalPolicyAmountByType(policies);
    }
    
    public IEnumerable<string> GetTopPolicyTypes(int topCount)
    {
        // In this case policy types are not sorted because there is no such a requirement 
        if (_totalPolicyAmountByType.Count <= topCount) return _totalPolicyAmountByType.Keys;

        if (topCount < Math.Log2(_totalPolicyAmountByType.Count))
        {
            return IterateTopAmountPolicyTypes(topCount);
        }
        
        if (_totalPolicyAmountByType.Count - topCount < Math.Log2(_totalPolicyAmountByType.Count))
        {
            return GetPolicyTypesWithoutLowAmountOnes(topCount);
        }
        
        return _totalPolicyAmountByType
            .OrderByDescending(p => p.Value)
            .Take(topCount)
            .Select(p => p.Key);
    }

    private IEnumerable<string> IterateTopAmountPolicyTypes(int topCount)
    {
        for (var i = 0; i < topCount; i++)
        {
            var topPolicyType = _totalPolicyAmountByType.MaxBy(p => p.Value);
            _totalPolicyAmountByType.Remove(topPolicyType.Key);
            yield return topPolicyType.Key;
        }
    }

    private IEnumerable<string> GetPolicyTypesWithoutLowAmountOnes(int topCount)
    {
        for (var i = 0; i < _totalPolicyAmountByType.Count - topCount; i++)
        {
            var topPolicyType = _totalPolicyAmountByType.MinBy(p => p.Value);
            _totalPolicyAmountByType.Remove(topPolicyType.Key);
        }
        return _totalPolicyAmountByType.Keys;
    }

    private Dictionary<string, decimal> GetTotalPolicyAmountByType(IEnumerable<Policy> policies)
    {
        var totalPolicyAmountByType = new Dictionary<string, decimal>();
        foreach (var policy in policies)
        {
            if (totalPolicyAmountByType.ContainsKey(policy.PolicyType))
                totalPolicyAmountByType[policy.PolicyType] += policy.PremiumAmount;
            else
                totalPolicyAmountByType.Add(policy.PolicyType, policy.PremiumAmount);
        }

        return totalPolicyAmountByType;
    }
}