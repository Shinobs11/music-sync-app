interface OAuthAuthorizationRequest {
    response_type: "code",
    client_id: string,
    redirect_uri: string,
    scope: string,
    code_challenge: string,
    //code_challenge_method for googleApi
    state: string
}
interface OAuthAuthorizationSuccessResponse {
    code: string,
    state: string
}
interface OAuthAuthorizationFailedResponse {
    error: string,
    state: string
}
interface OAuthAccessTokenRequest {
    grant_type: "authorization_code",
    code: string,
    redirect_uri: string,
    client_id: string,
    client_secret: string,
    code_verifier: string
}

interface OAuthAccessTokenResponse {
    access_token: string,
    expires_in: number,
    //id_token if in scope for googleapi
    refresh_token: string,
    //might not be includedscope: string,
    token_type: "Bearer"
}