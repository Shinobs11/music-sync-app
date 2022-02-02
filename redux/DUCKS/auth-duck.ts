import { createReducer, createAction } from "@reduxjs/toolkit"
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED } from 'expo-secure-store';
import { Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';


interface testType{
    isAuthed: boolean | undefined
}





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

            //I'm gonna need to manually dispatch these actions
            if (key === null) {
                console.log("Key not created, user isn't authenticated.");
                return false;
            }
            else {
                console.log("User has key created");
                return true;

            }
        }
        else {
            return false;
        }
    }
)




//init state with testType schema
const initState = {
    isAuthed:undefined
} as testType


//export and construct reducer given initState and testaction
export default createReducer(initState, (builder) => {
    builder.addCase(getAuthFromSecureStore.fulfilled, (state, action)=>{
        state.isAuthed = action.payload;
    }),
    builder.addCase(getAuthFromSecureStore.rejected, (state, action)=>{
        state.isAuthed = false;
    })
})


