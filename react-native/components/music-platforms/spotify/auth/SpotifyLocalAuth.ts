
import { auth, ApiScope, ApiConfig, SpotifySession } from 'react-native-spotify-remote';


//TODO: Generally ill-advised to hardcode client-id, remove later.
const CLIENT_ID = "cf9eb20ddb254f6092c24e80d37317f3"


const REDIRECT_URI = "music-sync://spotify-redirect"
const TOKEN_REFRESH_URI = "music-sync://spotify-refresh"
const TOKEN_SWAP_URI = "music-sync://spotify-swap"

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

export const authFlow = async():Promise<SpotifySession> =>{
    const sess:SpotifySession = await auth.authorize(genApiConfig());
    console.log(sess);
    return sess;
}