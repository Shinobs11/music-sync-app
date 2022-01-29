import { Platform } from 'react-native';
import {remote as SpotifyRemote, ApiScope, ApiConfig}
from 'react-native-spotify-remote';
import Auth from "expo-auth-session";
import Random from "expo-random";
import Crypto, { CryptoDigestAlgorithm, CryptoEncoding } from "expo-crypto";
//TODO: Generally ill-advised to hardcode client-id, remove later.
const CLIENT_ID = "cf9eb20ddb254f6092c24e80d37317f3"
//TODO: Would like to get a dedicated server for this, I'm not sure how I'll get this to work at school tho.
const REDIRECT_URL = "music-sync://spotify-redirect"
const TOKEN_REFRESH_URL = "music-sync://spotify-refresh"
const TOKEN_SWAP_URL = "music-sync://spotify-swap"


const generateRandomString = async (n: number) =>{
    return Crypto.digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    (await Random.getRandomBytesAsync(n)).toString(),
    {encoding: CryptoEncoding.HEX}
    )
}

const SCOPES = [
    "app-remote-control",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming",
    "user-follow-read",
    "user-library-read",
    "user-library-modify",
    "user-modify-playback",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-read-private",
    "user-read-recently-played",
    "user-top-read"
]



async function authReqConfig():Promise<Auth.AuthRequestConfig>{
    const config:Auth.AuthRequestConfig = {
    //responseType not needed, default is code
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URL,
    scopes: SCOPES,
    //
    state: await generateRandomString(16),

    }
    return config;
}

async function discoveryDoc():Promise<Auth.DiscoveryDocument>{
    const discDoc:Auth.DiscoveryDocument = {
        authorizationEndpoint:"https://accounts.spotify.com/authorize",
        tokenEndpoint:"https://accounts.spotify.com/api/token",
    }
    return discDoc;
}




export {authReqConfig, discoveryDoc};