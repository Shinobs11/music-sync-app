import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './DUCKS/main-duck';
import authReducer from './DUCKS/auth-duck';
import {AuthState} from '../redux/DUCKS/auth-duck'
//just trying to keep track of the structure, dont know if i'll actually use this.
//TODOS update later please for the love of god

interface StateType{
    auth: AuthState
}

const store =  
    
configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true,
    
})

export default store;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;