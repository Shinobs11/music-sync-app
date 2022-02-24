import { authCleanup } from "./DUCKS/auth-duck";
import { isAvailableAsync, getItemAsync, SecureStoreOptions, WHEN_UNLOCKED, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { SpotifyWebSession, SpotifyLocalSession, Session, SessionEnumType, AuthActionCreatorEnumType, SessionObjectState, SessionIsAuthedState} from '../types/AuthTypes';
import {instantiateState, AuthState} from './DUCKS/auth-duck';
import { SessionEnum } from "../constants/Auth";

/**
 * All i need this to do is pull authentication state from async storage,
 * run authcleanup with the pulled state and return that for init state
 */

const hydrateState = async ():Promise<AuthState> =>{
    let authObject:SessionObjectState = instantiateState<SessionObjectState>();
    let isAuthed:SessionIsAuthedState = instantiateState<SessionIsAuthedState>();
    try{
        for(const x in SessionEnum){
            let key;
            if(await isAvailableAsync() === true){
                key = await getItemAsync(`music-sync-app-${SessionEnum[x]}-auth`);
            }
            if(key!=undefined){
                authObject[SessionEnum[x]] = JSON.parse(key);            
            }
        }
    }
    catch(e){

    }
    return await authCleanup({authObject, isAuthed} as AuthState);
}

export default hydrateState;









