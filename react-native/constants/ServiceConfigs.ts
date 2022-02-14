import { ServiceConfiguration } from "react-native-app-auth"

export const SpotifyServiceConfig:ServiceConfiguration = {
    authorizationEndpoint:"https://accounts.spotify.com/oauth2/v2/auth",
    tokenEndpoint:"https://accounts.spotify.com/api/token",
    revocationEndpoint:"https://accounts.spotify.com/oauth2/revoke/v1"
}