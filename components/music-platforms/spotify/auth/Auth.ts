import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import Auth, { AuthRequest, AuthRequestPromptOptions, AuthSessionResult, useAuthRequest } from "expo-auth-session";
import store from '../../../../redux/store';
// import Random from "expo-random";
// import Crypto from "expo-crypto";
import {polyfillWebCrypto} from 'expo-standard-web-crypto';
import { setAuthInSecureStore } from '../../../../redux/DUCKS/auth-duck';
polyfillWebCrypto();


//TODO: Generally ill-advised to hardcode client-id, remove later.
const CLIENT_ID = "cf9eb20ddb254f6092c24e80d37317f3"
//TODO: Would like to get a dedicated server for this, I'm not sure how I'll get this to work at school tho.
const REDIRECT_URL = "music-sync://spotify-redirect"
const TOKEN_REFRESH_URL = "music-sync://spotify-refresh"
const TOKEN_SWAP_URL = "music-sync://spotify-swap"



const generateRandomString = (n: number) =>{
    // let opt:Crypto.CryptoDigestOptions = {encoding: Crypto.CryptoEncoding.HEX}
    // let key = await subtle.generateKey({
    //     name:'HMAC',
    //     hash:"SHA-256",
    //     length: n,
    // }, true, ['sign', 'verify'])
    
    // return subtle.exportKey("raw",key);
    var arr:String[] = []
    crypto.getRandomValues(new Uint8Array(n)).forEach(x=>arr.push(x.toString(n)))
    return arr.join('');
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



function authReqConfig():Auth.AuthRequestConfig{
    const config:Auth.AuthRequestConfig = {
    //responseType not needed, default is code
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URL,
    scopes: SCOPES,
    //
    state: generateRandomString(16),

    }
    return config;
}

function discoveryDoc():Auth.DiscoveryDocument{
    const discDoc:Auth.DiscoveryDocument = {
        authorizationEndpoint:"https://accounts.spotify.com/authorize",
        tokenEndpoint:"https://accounts.spotify.com/api/token",
    }
    return discDoc;
}

function authHook(){
    return (()=>{return useAuthRequest(authReqConfig(), discoveryDoc());})()
}

async function handlePrompt(promptAsync:()=>Promise<Auth.AuthSessionResult>){
    console.log("Handle Prompt Entered")
    let res = await promptAsync();

    switch(res.type){
        case 'success':{
            if(res.authentication){
                store.dispatch(setAuthInSecureStore(res.authentication));
            }
            break;
        }
        case 'error': {
            if(res.error){
                console.error(res.error)
            }
            break;
        }
        case 'dismiss':{
            break;
        }
        case 'cancel':{
            //todos: handle case in which user cancels prompt
            break;
        }
        case 'locked':{
            break;
        }
        default:{
            console.error("???????")
            break;
        }

    }
}



export {authHook, handlePrompt};