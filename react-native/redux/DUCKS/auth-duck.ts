import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { ActionSheetIOS, Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenResponse } from "expo-auth-session";
import { SpotifyWebSession, SpotifyLocalSession, Session, SessionEnumType } from '../../types/AuthTypes';
import { SpotifySession } from 'react-native-spotify-remote';
import { SessionEnum, enumKeys } from '../../constants/Auth';
import {authFlow} from "../../components/music-platforms/spotify/auth/SpotifyLocalAuth"
import { DeepPartial, filterUndefinedPromise, isEmptyObject } from "../../utils/Utils";
import {AuthConfiguration, refresh, RefreshResult} from 'react-native-app-auth';
import  store from '../store';



export { getAuthFromSecureStore, setAuthInSecureStore, deleteAuthInSecureStore };


const authCleanup = async (arg:Record<string,any>)=>{

    const spotifyWebSessionCleanup = async () =>{
        let obj:SpotifyWebSession = arg[SessionEnum.spotifyWebSession];
        try{
            const config:AuthConfiguration= {
                issuer: "https://accounts.spotify.com/api/token",
                clientId: "cf9eb20ddb254f6092c24e80d37317f3",
                redirectUrl: "music-sync://spotify-refresh",
                scopes: []
            }
            const res:RefreshResult = await refresh(config, {refreshToken: obj.refreshToken})
            console.log(res.accessTokenExpirationDate);
            //TODOS: DO the implementation steps for react-native-app-auth on iOS
            const expirationDate =parseInt(res.accessTokenExpirationDate);
            const newAuthObj:SpotifyWebSession = {
                refreshToken: obj.refreshToken,
                accessToken: res.accessToken,
                expirationDate: expirationDate ,
                expiresIn: 3600,
                issuedAt: expirationDate-3600,
                scope: obj.scope,
                tokenType:obj.tokenType
            }
            return newAuthObj;
        }
        catch(e){
            console.warn(e);
        }
        
    }
    const spotifyLocalSessionCleanup = () =>{
        let obj:SpotifyLocalSession = arg[SessionEnum.spotifyLocalSession];
        if(Date.now()>obj.expirationDate){
            //TODOS: Is there anyway to reauth without disrupting UI?
        }


    }
    //implement type guards in a switch kinda thing to call specific cleanups.
    for(var key in SessionEnum){
        switch(key){
            //during cleanup webSession should refresh token and set the new token into store.
            case SessionEnum.spotifyWebSession:{
                const res:SpotifyWebSession = await filterUndefinedPromise(spotifyWebSessionCleanup());
                arg = {...arg, [SessionEnum[key]]:res}
                break;
            }
            case SessionEnum.spotifyLocalSession:{

                break;
            }
            default:{
                break;
            }
        }

        
    }




}


const getAuthFromSecureStore = createAsyncThunk("auth/getAuthFromSecureStore",
    async (arg, thunk) => {
        //TODOS: make a dedicate type later
        var authObj:Record<string, any> = {}            
        try {
            for(var x in SessionEnum){
            var key;
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
                }
                
            }
            // console.log("get "+`music-sync-app-${SessionEnum[x]}-auth`);
            if(key!=null){
                authObj[SessionEnum[x]] = JSON.parse(key);
            }            
        }
            //dispatch is a synchronous method, so 
            authCleanup(authObj)
            if(isEmptyObject(authObj[SessionEnum.spotifyLocalSession])){
                await thunk.dispatch(setAuthInSecureStore({type: SessionEnum.spotifyLocalSession, payload: authFlow() as Promise<SpotifyLocalSession>}));
            }
        }
        catch (e) {
            console.warn(e);
        }
    return authObj;
    }
)

// Interface in question

//TODOS refactor so TokenResponse isn't used
const setAuthInSecureStore = createAsyncThunk("auth/setAuthInSecureStore", async (data:{payload: Promise<Session>, type: string}, thunkapi) => {
    const authType = data.type;
    const promise = data.payload;
    
    try {
        var authSess:Session = await promise;


        if (await isAvailableAsync() === true) {
            if (Platform.OS == 'ios') {
                const secureStoreOptions: SecureStoreOptions = {
                    keychainAccessible: WHEN_UNLOCKED
                }
                setItemAsync(`music-sync-app-${authType}-auth`, JSON.stringify(authType), secureStoreOptions);
            }
            else {
                // console.log("Sending key to secure store")

                setItemAsync(`music-sync-app-${authType}-auth`, JSON.stringify(authType));

            }
        }
        return {authSess, authType} as {[index:string]:any};
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

type authRecord = {
    [index:string]:any
}

interface authState {
    isAuthed: authRecord,
    authObject: authRecord
} //figure out this typescript stuff tomorrow ugh


// //init state with testType schema
const instantiateState = () =>{
    var obj:Record<string, any> = {}
    for(const key in SessionEnum){
        obj[SessionEnum[key as string]]
    }
    return obj;
}
const initState = {
    isAuthed: instantiateState(),
    authObject: instantiateState()
} as authState


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
            // console.log("putting key from secure store into state")
            state.authObject = action.payload;
            var authed:authRecord = {}
            for(var x in SessionEnum){
                if(state.authObject[SessionEnum[x]]){
                    if(state.authObject[SessionEnum[x]]["expirationDate"]>= (new Date).getTime()){
                        if(state.authObject[SessionEnum[x]]["accessToken"]){
                            authed[SessionEnum[x]] = true;
                        }
                        else{
                            authed[SessionEnum[x]] = false;
                        }
                    }
                    else{
                        authed[SessionEnum[x]] = false;
                    }
                }
                else{
                    authed[SessionEnum[x]] = false;
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
                state.isAuthed[action.payload.authType] = true;
                state.authObject[action.payload.authType] = action.payload.payload;
            }
        })
})


