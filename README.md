# Prerequisites:
- .NET 9.0
- Node v20+
- SQL Server

# Launch project:
- Clone project or copy project files
- Create new database
- Paste the connection string to your database to InsurancePolicyDashboard/appsettings.json file as ConnectionStrings:PolicyDb property
- Run project in your IDE or by using "dotnet run" command

# Docker deploy:
- Make the steps from the Launch project section related to creating the database
- run "docker compose up" command from the root folder
