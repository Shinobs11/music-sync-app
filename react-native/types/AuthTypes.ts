

export interface SpotifyWebSession {
    [index:string]:any
    "accessToken": string,
    "refreshToken": string,
    "scope": string[],
    "tokenType": string,
    "expirationDate": number
}

export interface SpotifyLocalSession{
    [index:string]:any
    "accessToken": string,
    "expirationDate": number,
    //TODOs: iOS scope implementation
}

export interface GoogleSession{
    "accessToken": string,
    "refreshToken": string,
    "scope": string[],
    "tokenType": string,
    "expirationDate": number
}

export type Session = SpotifyLocalSession | SpotifyWebSession | GoogleSession;
//UPDATE ON ADDITIONAL PLATFORM
export interface SessionEnumType{
    [index:string]: string
    "spotifyWebSession": string,
    "spotifyLocalSession": string,
    "googleSession": string
}
