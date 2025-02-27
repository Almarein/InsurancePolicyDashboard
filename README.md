# Prerequisites:
- .NET 9.0
- Node v20+
- SQL Server

# Launch project:
- Clone project or copy project files
- Create new database
- Paste the connection string to your database to InsurancePolicyDashboard/appsettings.json file as ConnectionStrings:PolicyDb property
- Run project in your IDE or by using "dotnet run" command

# Regarding docker deployment:
I had no success in running the application normally inside Docker containers, primarily because of the related to SSL certificates issues. I had a successful attempt on my local machine on Debian but it did not start on Windows machine. You can find my attempts in the repository if you are interested in it.
