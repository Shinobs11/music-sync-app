import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync } from 'expo-secure-store';
import { ActionSheetIOS, Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenResponse } from "expo-auth-session";
import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";






export const getAuthFromSecureStore = createAsyncThunk("auth/getAuthFromSecureStore",
    async () => {
        let key;
        if (await isAvailableAsync() === true) {
            console.log("Secure Store available");
            if (Platform.OS == "ios") {
                const options: SecureStoreOptions = {
                    keychainAccessible: WHEN_UNLOCKED,
                    //keychainService? not sure how to implement well
                    //requireAuthentication? might not be good for user experience
                }
                {
                    key = await getItemAsync("music-sync-app-auth", options);
                }
            }
            else {
                key = await getItemAsync("music-sync-app-auth");
            }

            return key;
    }
    }
    )

export const setAuthInSecureStore = createAsyncThunk("auth/setAuthInSecureStore", async (tokenRes:TokenResponse)=>{

    if(await isAvailableAsync() === true){
    if(Platform.OS == 'ios'){
        const options: SecureStoreOptions = {
            keychainAccessible: WHEN_UNLOCKED
        }
        setItemAsync("music-sync-app-auth", JSON.stringify(tokenRes), options);
    }
    else{
        setItemAsync("music-sync-app-auth", JSON.stringify(tokenRes));
    }
    }
    return tokenRes;
})

interface testType{
    isAuthed: boolean | undefined,
    authObject?: TokenResponse
}


//init state with testType schema
const initState = {
    isAuthed: undefined 
} as testType


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action)=>{
        if(typeof action.payload === "string"){
            state.isAuthed = true;
            state.authObject = JSON.parse(action.payload);
        }
        else{
            state.isAuthed = false;
        }
    }),
    builder.addCase(getAuthFromSecureStore.rejected, (state, action)=>{
        state.isAuthed = false;
    }),
    builder.addCase(setAuthInSecureStore.fulfilled, (state, action)=>{
        state.isAuthed = true;
        state.authObject = action.payload
    })
})


