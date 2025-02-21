using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PolicyDomain.Services;
using PolicyDomain.Validators;
using PolicyStorage;
using PolicyStorage.Repository;
using Shared.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextFactory<PolicyContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("PolicyDb"),
        contextOptions =>
        {
            contextOptions.MigrationsHistoryTable("__Migrations");
            contextOptions.MigrationsAssembly(typeof(PolicyContext).Assembly.FullName);
        });
});

builder.Services.AddControllersWithViews();
builder.Services.AddValidatorsFromAssemblyContaining(typeof(PolicyValidator));

builder.Services.AddTransient<IPolicyRepository, PolicyRepository>();
builder.Services.AddTransient<IPolicyService, PolicyService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

await using (var scope = app.Services.CreateAsyncScope())
{
    var context = await scope.ServiceProvider.GetService<IDbContextFactory<PolicyContext>>().CreateDbContextAsync();
    await context.Database.MigrateAsync();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

await app.RunAsync();