
import { Platform } from 'react-native';


import { authorize, refresh, prefetchConfiguration, AuthConfiguration, AuthorizeResult } from 'react-native-app-auth';
import {spotify} from "../../../../../env.json";
import { SpotifyServiceConfig } from '../../../../constants/ServiceConfigs';
import type { SpotifyWebSession } from "../../../../types/AuthTypes";
import { SessionEnum } from '../../../../constants/Auth';
import { setAuthInSecureStore } from '../redux/actions';
import store from '../../../../redux/store';
export const SCOPES = [
    "app-remote-control", // maybe comment out if it interferes
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming",
    "user-follow-read",
    "user-library-read",
    "user-library-modify",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-read-private",
    "user-read-recently-played",
    "user-top-read"
]



const REDIRECT_URI = "com.music.sync.auth://spotify-redirect"
const TOKEN_REFRESH_URI = "com.music.sync.auth://spotify-refresh"
const TOKEN_SWAP_URI = "com.music.sync.auth://spotify-swap"


const CLIENT_ID = spotify.CLIENT_ID
//TODO: extremely ill-advised to hardcode client-secret, for the love of god remove later.
const CLIENT_SECRET = spotify.CLIENT_SECRET

const config:AuthConfiguration = {
    scopes: SCOPES,
    redirectUrl: REDIRECT_URI,
    usePKCE: true,
    warmAndPrefetchChrome: false,
    skipCodeExchange: false, // TODOS: IMplement server-side code exchange
    clientId:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    serviceConfiguration: SpotifyServiceConfig
}

prefetchConfiguration(config);





const spotifyWebAuthFlow = async ():Promise<SpotifyWebSession>=>{
    const res:AuthorizeResult = await authorize(config);
    const handleRes = async ()=>{
        return({
            accessToken:res.accessToken,
            refreshToken: res.refreshToken,
            expirationDate: (new Date(res.accessTokenExpirationDate)).getTime(),
            scope: res.scopes,
            tokenType:res.tokenType,
        })
    }
    const handledRes = handleRes();
    store.dispatch(setAuthInSecureStore({payload:handledRes, type:SessionEnum.spotifyWebSession}));
    return await handledRes;

}
const spotifyWebRefreshFlow = async(refreshToken:string)=>{
    return refresh(config, {
        refreshToken:refreshToken
    })
}







export { spotifyWebAuthFlow, spotifyWebRefreshFlow};



