export interface SpotifyWebSession {
    "accessToken": string,
    "expiresIn": number,
    "issuedAt": number,
    "refreshToken": string,
    "scope": string,
    "tokenType": string,
    "expirationDate": number
}

export interface SpotifyLocalSession{
    "accessToken": string,
    "expirationDate": number,
    "expired": boolean,
    "refreshToken": string,
    //TODOs: iOS scope implementation
}

//UPDATE ON ADDITIONAL PLATFORM
export interface AuthPlatforms{
    spotifyWebSession: unknown,
    spotifyLocalSession: unknown,
}