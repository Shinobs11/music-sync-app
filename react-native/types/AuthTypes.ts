export interface SpotifyWebSession {
    [index:string]:any
    "accessToken": string,
    "expiresIn": number,
    "issuedAt": number,
    "refreshToken": string,
    "scope": string,
    "tokenType": string,
    "expirationDate": number
}

export interface SpotifyLocalSession{
    [index:string]:any
    "accessToken": string,
    "expirationDate": number,
    //TODOs: iOS scope implementation
}
export type Session = SpotifyLocalSession | SpotifyWebSession;
//UPDATE ON ADDITIONAL PLATFORM
export interface SessionEnumType{
    [index:string]: string
    "spotifyWebSession": string,
    "spotifyLocalSession": string
}
