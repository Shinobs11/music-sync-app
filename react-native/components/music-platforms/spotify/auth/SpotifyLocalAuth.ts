
import { auth, ApiScope, ApiConfig, SpotifySession } from 'react-native-spotify-remote';
import { SpotifyLocalSession } from '../../../../types/AuthTypes';
import {spotify} from "../../../../../env.json";

const CLIENT_ID = spotify.CLIENT_ID



const REDIRECT_URI = "com.music.sync.auth://spotify-redirect"
const TOKEN_REFRESH_URI = "com.music.sync.auth://spotify-refresh"
const TOKEN_SWAP_URI = "com.music.sync.auth://spotify-swap"

const genApiConfig = ():ApiConfig =>{
    const conf:ApiConfig = {
        authType: "TOKEN",
        clientID: CLIENT_ID,
        //playURI not needed,
        redirectURL: REDIRECT_URI,
        scopes: scopes,
        showDialog: true ,
        tokenRefreshURL: TOKEN_REFRESH_URI,
        tokenSwapURL: TOKEN_SWAP_URI
    }
    return conf;
}


const scopes = [
    ApiScope.AppRemoteControlScope,
    ApiScope.PlaylistModifyPrivateScope,
    ApiScope.PlaylistReadCollaborativeScope,
    ApiScope.PlaylistReadPrivateScope,
    ApiScope.StreamingScope,
    ApiScope.UserFollowReadScope,
    ApiScope.UserLibraryReadScope,
    ApiScope.UserLibraryModifyScope,
    ApiScope.UserModifyPlaybackStateScope,
    ApiScope.UserReadCurrentlyPlayingScope,
    ApiScope.UserReadPlaybackPosition,
    ApiScope.UserReadPlaybackStateScope,
    ApiScope.UserReadPrivateScope,
    ApiScope.UserReadRecentlyPlayedScope,
    ApiScope.UserTopReadScope,
]

export const authFlow = async():Promise<SpotifyLocalSession> =>{
    const sess:SpotifySession = await auth.authorize(genApiConfig());
    let substrStart = sess.expirationDate.indexOf("time=") + 5;
    let substrEnd = sess.expirationDate.indexOf(",", substrStart);
    let expirationDate = parseInt(sess.expirationDate.substring(substrStart, substrEnd))
    return {
        accessToken:sess.accessToken,
        expirationDate: expirationDate
    };
}