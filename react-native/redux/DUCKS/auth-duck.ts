import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { ActionSheetIOS, Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpotifyWebSession, SpotifyLocalSession, Session, SessionEnumType, AuthActionCreatorEnumType, SessionObjectState, SessionIsAuthedState } from '../../types/AuthTypes';
import { SpotifySession } from 'react-native-spotify-remote';
import { SessionEnum, enumKeys } from '../../constants/Auth';
import {authFlow} from "../../components/music-platforms/spotify/auth/SpotifyLocalAuth"
import { DeepPartial, filterUndefinedPromise, isEmptyObject } from "../../utils/Utils";
import {AuthConfiguration, refresh, RefreshResult} from 'react-native-app-auth';
import  store from '../store';
import type { AnyAction } from "redux";

export { getAuthFromSecureStore, setAuthInSecureStore, deleteAuthInSecureStore };


const authActionCreatorEnum:AuthActionCreatorEnumType = {
    updateAuthState:"auth/updateAuthState",
    getAuthFromSecureStore:"auth/getAuthFromSecureStore",
    setAuthInSecureStore:"auth/setAuthInSecureStore",
    deleteAuthInSecureStore:"auth/deleteAuthInSecureStore"
}


export const instantiateState = <T extends Record<string, any>>() =>{
    var obj:{[index:string]:any|undefined} = {};
    for(const key in SessionEnum){
        obj[SessionEnum[key as string]] = undefined
    }
    return obj as T;
}
/**
 * authCleanup should do two things
 * 1. Refresh any tokens that can be refreshed
 * 2. If a token cannot be refresh and is expired,
 *    authCleanup should set the SecureStore value to an empty string and return an empty object
 */
//!!!
// TODOS: Hydrate redux store on startup and include authCleanup in the process of hydration.
// AuthCleanup should only need to run once per instance of the app, or maybe after a timer too since token life is fairly short.
//!!!!
export const authCleanup = async (authState:AuthState):Promise<AuthState>=>{
    const spotifyWebSessionCleanup = async () =>{
        const obj:SpotifyWebSession|undefined = authState.authObject.spotifyWebSession;
        if(obj === undefined){
            return undefined;
        }
        try{
            const config:AuthConfiguration= {
                issuer: "https://accounts.spotify.com/api/token",
                clientId: "cf9eb20ddb254f6092c24e80d37317f3",
                redirectUrl: "music-sync://home",
                scopes: []
            }
            const res:RefreshResult = await refresh(config, {refreshToken: obj.refreshToken})
            
            //TODOS: DO the implementation steps for react-native-app-auth on iOS
            const expirationDate =parseInt(res.accessTokenExpirationDate);
            const newSpotifyWebAuthObj:SpotifyWebSession = {
                refreshToken: obj.refreshToken,
                accessToken: res.accessToken,
                expirationDate: expirationDate ,
                expiresIn: 3600,
                issuedAt: expirationDate-3600,
                scope: obj.scope,
                tokenType:obj.tokenType
            }
            return newSpotifyWebAuthObj;
        }
        catch(e){
            console.warn("Spotify web token refresh was not successful, react-native-app-auth throws this error \n" + e);
            return undefined;
        }
    }
    
    
    let refreshedAuthObject:SessionObjectState = instantiateState<SessionObjectState>();
    let refreshedIsAuthedObject:SessionIsAuthedState = instantiateState<SessionIsAuthedState>();
    for(const key in SessionEnum){
        switch(key){
            case SessionEnum.spotifyWebSession:{
                const res:SpotifyWebSession|undefined =  await spotifyWebSessionCleanup();
                refreshedAuthObject = {...refreshedAuthObject, [SessionEnum[key]]: res}
                refreshedIsAuthedObject = {...refreshedIsAuthedObject, [SessionEnum[key]]: res ? true:false}
                break;
            }
            case SessionEnum.spotifyLocalSession:{
                const res = await authFlow() as SpotifyLocalSession|undefined
                refreshedAuthObject = {...refreshedAuthObject, [SessionEnum[key]]:res}
                refreshedIsAuthedObject = {...refreshedIsAuthedObject, [SessionEnum[key]]: res ? true:false}
                break;
            }
            default:{
                break;
            }
        }

        
    }
    
    return {
        isAuthed: refreshedIsAuthedObject,
        authObject: refreshedAuthObject
    }

}

const updateAuthState = createAsyncThunk(authActionCreatorEnum.updateAuthState, async ()=>{

})

const getAuthFromSecureStore = createAsyncThunk("auth/getAuthFromSecureStore",
    async (arg, thunk) => {
        //TODOS: make a dedicate type later
        let authObj:SessionObjectState = instantiateState()           
        try {
            for(const x in SessionEnum){
            let key;
            if (await isAvailableAsync() === true) {
                
                if (Platform.OS == "ios") {
                    const secureStoreOptions: SecureStoreOptions = {
                        keychainAccessible: WHEN_UNLOCKED,
                        //keychainService? not sure how to implement well
                        //requireAuthentication? might not be good for user experience
                    }
                    {
                        key = await getItemAsync(`music-sync-app-${SessionEnum[x]}-auth`, secureStoreOptions);
                    }
                }
                else {
                    key = await getItemAsync(`music-sync-app-${SessionEnum[x]}-auth`);
                    console.log("Pulled key" + key + "from secure store")
                }
                
            }
            
            if(key!=undefined){
                authObj[SessionEnum[x]] = JSON.parse(key);
                
            } 
                       
        }
        }
        catch (e) {
            console.warn(e);
        }
    return authObj;
    }
)

const setAuthInSecureStore = createAsyncThunk("auth/setAuthInSecureStore", async (data:{payload: Promise<Session|undefined>, type: string}, thunkapi):Promise<void> => {
    const authType = data.type;
    const promise = data.payload;
    
    try {
        let authSess:Session|undefined = await promise;
        if (await isAvailableAsync() === true) {
            if (Platform.OS == 'ios') {
                const secureStoreOptions: SecureStoreOptions = {
                    keychainAccessible: WHEN_UNLOCKED
                }
                setItemAsync(`music-sync-app-${authType}-auth`, JSON.stringify(authSess), secureStoreOptions);
            }
            else {
                setItemAsync(`music-sync-app-${authType}-auth`, JSON.stringify(authSess));
                // console.log(authType)
            }
        }
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


export interface AuthState {
    isAuthed: SessionIsAuthedState,
    authObject: SessionObjectState
} //figure out this typescript stuff tomorrow ugh


// //init state with testType schema

const initState = {
    isAuthed: instantiateState(),
    authObject: instantiateState()
} as AuthState

//TODOS: for tomorrow CLEANUP WHATEVER IS GOING ON IN THIS REDUCER THAT I MADE TWO WEEKS AGO
//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action:AnyAction) => {
        const payload:SessionObjectState = action.payload as SessionObjectState;    
        state = {...state, authObject: payload};
        }
    ),
    builder.addCase(getAuthFromSecureStore.rejected, (state, action) => {
    })
})


