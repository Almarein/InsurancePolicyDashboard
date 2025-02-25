using System.Diagnostics;
using PolicyDomain.Utilities;
using Shared.Model;
using Xunit;
using Xunit.Abstractions;

namespace UnitTests;

public class TopPolicyTypesDeterminerTests
{
    private readonly ITestOutputHelper _output;

    public TopPolicyTypesDeterminerTests(ITestOutputHelper output)
    {
        _output = output;
    }
    
    [Fact]
    public void ShouldDetermineTopPolicyType()
    {
        var determiner = new TopPolicyTypesDeterminer(GetTestPolicies());
        var topPolicyTypes = determiner.GetTopPolicyTypes(1);
        Assert.Equal("Home", topPolicyTypes.Single());
    }

    [Fact]
    public void ShouldDetermineTopTwoPolicyType()
    {
        var determiner = new TopPolicyTypesDeterminer(GetTestPolicies());
        var topPolicyTypes = determiner.GetTopPolicyTypes(2).ToArray();
        Assert.Contains(topPolicyTypes, t => t == "Home");
        Assert.Contains(topPolicyTypes, t => t == "Business");
    }
    
    [Fact]
    public void ShouldDetermineTopThreePolicyType()
    {
        var determiner = new TopPolicyTypesDeterminer(GetTestPolicies());
        var topPolicyTypes = determiner.GetTopPolicyTypes(3).ToArray();
        Assert.Contains(topPolicyTypes, t => t == "Home");
        Assert.Contains(topPolicyTypes, t => t == "Business");
        Assert.Contains(topPolicyTypes, t => t == "Car");
    }

    [Theory]
    [InlineData(1000000, 10, 5)]
    [InlineData(1000000, 100, 10)]
    [InlineData(1000000, 1000, 10)]
    [InlineData(1000000, 10000, 100)]
    public void PerformanceTest(int policyCount, int policyTypeCount, int topPolicyTypeCount)
    {
        var policies = new PolicyGenerator(policyTypeCount).Generate(policyCount);
        var stopWatch = new Stopwatch();
        stopWatch.Start();
        var determiner = new TopPolicyTypesDeterminer(policies);
        determiner.GetTopPolicyTypes(topPolicyTypeCount).ToArray();
        stopWatch.Stop();
        _output.WriteLine(stopWatch.ElapsedMilliseconds.ToString());
    }

    private IEnumerable<Policy> GetTestPolicies()
    {
        yield return new Policy { PolicyType = "Car", PremiumAmount = 100 };
        yield return new Policy { PolicyType = "Car", PremiumAmount = 200 };
        yield return new Policy { PolicyType = "Car", PremiumAmount = 300 };
        yield return new Policy { PolicyType = "Car", PremiumAmount = 400 };
        yield return new Policy { PolicyType = "Home", PremiumAmount = 300 };
        yield return new Policy { PolicyType = "Home", PremiumAmount = 500 };
        yield return new Policy { PolicyType = "Home", PremiumAmount = 600 };
        yield return new Policy { PolicyType = "Home", PremiumAmount = 700 };
        yield return new Policy { PolicyType = "Home", PremiumAmount = 800 };
        yield return new Policy { PolicyType = "Business", PremiumAmount = 900 };
        yield return new Policy { PolicyType = "Business", PremiumAmount = 1000 };
    }
}