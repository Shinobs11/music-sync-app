import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { ActionSheetIOS, Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenResponse } from "expo-auth-session";





export { getAuthFromSecureStore, setAuthInSecureStore, deleteAuthInSecureStore };

const getAuthFromSecureStore = createAsyncThunk("auth/getAuthFromSecureStore",
    async () => {
        try {
            let key;
            if (await isAvailableAsync() === true) {
                // console.log("Secure Store available");
                if (Platform.OS == "ios") {
                    const secureStoreOptions: SecureStoreOptions = {
                        keychainAccessible: WHEN_UNLOCKED,
                        //keychainService? not sure how to implement well
                        //requireAuthentication? might not be good for user experience
                    }
                    {
                        key = await getItemAsync("music-sync-app-auth", secureStoreOptions);
                    }
                }
                else {
                    key = await getItemAsync("music-sync-app-auth");
                }

                return key;
            }

        }
        catch (e) {
            console.warn(e);
        }
    }
)

// Interface in question
export interface NonSerializedTokenResponse {
    "accessToken": string,
    "expiresIn": number,
    "issuedAt": number,
    "refreshToken": string,
    "scope": string,
    "tokenType": string
}

const setAuthInSecureStore = createAsyncThunk("auth/setAuthInSecureStore", async (tokenPromise: Promise<TokenResponse | undefined>) => {
    try {
        const result = (await tokenPromise);

        // Function in question
        const tokenRes = ((result: TokenResponse): NonSerializedTokenResponse => {
            return {
                accessToken: result.accessToken,
                expiresIn: result.expiresIn as number,
                issuedAt: result.issuedAt,
                refreshToken: result.refreshToken as string,
                scope: result.scope as string,
                tokenType: result.tokenType
            }
        })(result as TokenResponse);



        if (await isAvailableAsync() === true) {
            if (Platform.OS == 'ios') {
                const secureStoreOptions: SecureStoreOptions = {
                    keychainAccessible: WHEN_UNLOCKED
                }
                setItemAsync("music-sync-app-auth", JSON.stringify(tokenRes), secureStoreOptions);
            }
            else {
                // console.log("Sending key to secure store")

                setItemAsync("music-sync-app-auth", JSON.stringify(tokenRes));

            }
        }
        return tokenRes;
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

interface testType {
    isAuthed: boolean | undefined,
    authObject?: NonSerializedTokenResponse
}


//init state with testType schema
const initState = {
    isAuthed: undefined
} as testType


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
            // console.log("putting key from secure store into state")
            state.isAuthed = true;
            state.authObject = JSON.parse(action.payload);
        }
        else {
            state.isAuthed = false;
            state.authObject = undefined;
        }
    }),
        builder.addCase(getAuthFromSecureStore.rejected, (state, action) => {
            state.isAuthed = false;
        }),
        builder.addCase(setAuthInSecureStore.fulfilled, (state, action) => {
            // console.log("putting key from action into state");
            state.isAuthed = true;
            state.authObject = action.payload
        })
})


