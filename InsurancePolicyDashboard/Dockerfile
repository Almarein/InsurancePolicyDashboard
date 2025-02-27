FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 3000
EXPOSE 3001

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src
COPY ["InsurancePolicyDashboard/InsurancePolicyDashboard.csproj", "InsurancePolicyDashboard/"]
RUN dotnet restore "InsurancePolicyDashboard/InsurancePolicyDashboard.csproj"
COPY . .
WORKDIR "/src/InsurancePolicyDashboard"
RUN dotnet build "InsurancePolicyDashboard.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "InsurancePolicyDashboard.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "InsurancePolicyDashboard.dll"]
