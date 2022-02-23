

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
export interface SessionEnumType{
    [index:string]: string
    "spotifyWebSession": string,
    "spotifyLocalSession": string,
    "googleSession": string
}

export type Session = SpotifyLocalSession | SpotifyWebSession | GoogleSession;
export interface SessionObjectState{
    [index:string]: Object | undefined
    "spotifyWebSession": SpotifyWebSession | undefined;
    "spotifyLocalSession": SpotifyLocalSession | undefined;
    "googleSession": GoogleSession | undefined;
}
export interface SessionIsAuthedState{
    [index:string]: boolean | undefined
    "spotifyWebSession": boolean | undefined;
    "spotifyLocalSession": boolean | undefined;
    "googleSession": boolean | undefined
}
//UPDATE ON ADDITIONAL PLATFORM

export interface AuthActionCreatorEnumType{
    [index:string]: string,
    updateAuthState:string,
    getAuthFromSecureStore:string,
    setAuthInSecureStore:string,
    deleteAuthInSecureStore:string
}