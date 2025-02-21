using Microsoft.EntityFrameworkCore;
using Shared.DbModel;

namespace PolicyStorage;

public class PolicyContext : DbContext
{
    public PolicyContext(DbContextOptions<PolicyContext> options) : base(options)
    {
    }
    
    public DbSet<PolicyModel> Policies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PolicyModel>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Id).ValueGeneratedOnAdd();
            entity.Property(p => p.PremiumAmount).HasColumnType("decimal(18,2)");
            
            entity.HasIndex(p => p.PolicyType);
            entity.HasIndex(p => p.StartDate);
            entity.HasIndex(p => p.EndDate);
        });
    }
}