import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { ActionSheetIOS, Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenResponse } from "expo-auth-session";
import { SpotifyWebSession } from '../../types/authTypes';
import { SpotifySession } from 'react-native-spotify-remote';
import { SessionEnum } from '../../constants/Auth';
import {authFlow} from "../../components/music-platforms/spotify/auth/SpotifyLocalAuth"

export { getAuthFromSecureStore, setAuthInSecureStore, deleteAuthInSecureStore };



const getAuthFromSecureStore = createAsyncThunk("auth/getAuthFromSecureStore",
    async (arg, thunk) => {
        var authObj:Record<string, any> = {}
        
        for(var x in SessionEnum){
            
        try {

            switch(x){
                case SessionEnum.spotifyLocalSession:{
                    thunk.dispatch(setAuthInSecureStore(authFlow()));
                }
            }
                
            

            var key;
            if (await isAvailableAsync() === true) {
                
                if (Platform.OS == "ios") {
                    const secureStoreOptions: SecureStoreOptions = {
                        keychainAccessible: WHEN_UNLOCKED,
                        //keychainService? not sure how to implement well
                        //requireAuthentication? might not be good for user experience
                    }
                    {
                        key = await getItemAsync(`music-sync-app-${x}-auth`, secureStoreOptions);
                    }
                }
                else {
                    key = await getItemAsync(`music-sync-app-${x}-auth`);
                }
                
            }
            console.log("get "+`music-sync-app-${x}-auth`);
            if(key!=null){
                authObj[x] = JSON.parse(key);
            }
            
            

        }
        catch (e) {
            console.warn(e);
        }
    }
    console.log(authObj, "hello");
    return authObj;
    }
)

// Interface in question
export interface SpotifyLocalSession{
    "accessToken": string,
    "expirationDate": number,
    "expired": boolean,
    "refreshToken": string,
    //TODOs: iOS scope implementation
}

const setAuthInSecureStore = createAsyncThunk("auth/setAuthInSecureStore", async (tokenPromise: Promise<SpotifySession> | Promise<TokenResponse>, thunkapi) => {
    const isSpotifyLocalSession = (result: SpotifySession): SpotifyLocalSession=>{  
        let substrStart = result.expirationDate.indexOf("time=") + 5;
        let substrEnd = result.expirationDate.indexOf(",", substrStart);
        let expirationDate = parseInt(result.expirationDate.substring(substrStart, substrEnd))
    
        const authSess:SpotifyLocalSession = {
            accessToken: result.accessToken,
            expirationDate: expirationDate,
            expired: (new Date().getUTCMilliseconds()) >= expirationDate ? true: false,
            refreshToken: result.refreshToken
        }
        return authSess;
    }

    const isSpotifyWebSession = (result: TokenResponse): SpotifyWebSession=>{
        const authSess:SpotifyWebSession = {
            accessToken: result.accessToken,
            expiresIn: 3600,
            issuedAt: result.issuedAt,
            refreshToken: result.refreshToken as string,
            scope: result.scope ? result.scope : "",
            tokenType: result.tokenType,
            expirationDate: (3600+result.issuedAt)*1000
        }
        return authSess;
    }

    const processResult = (result: TokenResponse|SpotifySession) =>{
        if("issuedAt" in result){
            return {type:SessionEnum.spotifyWebSession, payload:isSpotifyWebSession(result as TokenResponse)}
        }
        else{
            return {payload: isSpotifyLocalSession(result as SpotifySession), type:SessionEnum.spotifyLocalSession}
        }
    }
    
    try {
        

        var result = (await tokenPromise);
        var authSess = processResult(result);


        if (await isAvailableAsync() === true) {
            if (Platform.OS == 'ios') {
                const secureStoreOptions: SecureStoreOptions = {
                    keychainAccessible: WHEN_UNLOCKED
                }
                setItemAsync(`music-sync-app-${authSess.type}-auth`, JSON.stringify(authSess.payload), secureStoreOptions);
            }
            else {
                // console.log("Sending key to secure store")

                setItemAsync(`music-sync-app-${authSess.type}-auth`, JSON.stringify(authSess.payload));

            }
        }
        return authSess;
    }
    catch (e) {
        console.warn(e);
    }
})

const deleteAuthInSecureStore = createAsyncThunk("auth/deleteAuthInSecureStore",
    
    async (arg, thunkapi) => {
        if(await isAvailableAsync() === true){
        if (Platform.OS == 'ios') {
            const secureStoreOptions: SecureStoreOptions = {
                keychainAccessible: WHEN_UNLOCKED
            }
            await deleteItemAsync("music-sync-app-auth", secureStoreOptions);       
        }
        else{
            await deleteItemAsync("music-sync-app-auth");
        }

        if(await isAvailableAsync() === true){
            thunkapi.dispatch(getAuthFromSecureStore());
        }
    }
}
)

interface isAuthed{
    spotifyLocalSession: boolean | undefined,
    SpotifyWebSession: boolean | undefined
}
interface authState {
    isAuthed: 
    authObject: Record<string, any>
} //figure out this typescript stuff tomorrow ugh


//init state with testType schema
const initState = {
    isAuthed: {
        spotifyLocalSession: undefined,
        SpotifyWebSession: undefined
    },
    authObject:{}
} as authState


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
            // console.log("putting key from secure store into state")
            state.authObject = action.payload;
            var authed:Record<string, (boolean|undefined)> = {}
            for(var x in SessionEnum){
                if(state.authObject[x]){
                    if(state.authObject[x]["expirationDate"]>= (new Date).getTime()){
                        if(state.authObject[x]["accessToken"]){
                            authed[x] = true;
                        }
                        else{
                            authed[x] = false;
                        }
                    }
                    else{
                        authed[x] = false;
                    }
                }
                else{
                    authed[x] = false;
                }
            }
            state.isAuthed = authed;
        }
        else {
            state.authObject = {};
        }
    }),
        builder.addCase(getAuthFromSecureStore.rejected, (state, action) => {
        }),
        builder.addCase(setAuthInSecureStore.fulfilled, (state, action) => {
            // console.log("putting key from action into state");
            
            if(action.payload){
                state.authed[action.payload.type] = true;
                state.authObject[action.payload.type] = action.payload.payload;
            }
        })
})


