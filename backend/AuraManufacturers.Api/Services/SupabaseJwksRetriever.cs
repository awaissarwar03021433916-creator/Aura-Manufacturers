using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace AuraManufacturers.Api.Services;

/// <summary>
/// Supabase publishes its asymmetric (ES256) signing keys at /auth/v1/.well-known/jwks.json.
/// This turns that raw JWKS document into the configuration object JwtBearer expects, so the
/// built-in ConfigurationManager handles caching and refreshes on key rotation (unknown kid).
/// </summary>
public class SupabaseJwksRetriever : IConfigurationRetriever<OpenIdConnectConfiguration>
{
    public async Task<OpenIdConnectConfiguration> GetConfigurationAsync(
        string address, IDocumentRetriever retriever, CancellationToken cancel)
    {
        var json = await retriever.GetDocumentAsync(address, cancel);
        var jwks = new JsonWebKeySet(json);

        var config = new OpenIdConnectConfiguration { JwksUri = address, JsonWebKeySet = jwks };
        foreach (var key in jwks.GetSigningKeys())
            config.SigningKeys.Add(key);
        return config;
    }
}
