import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './DUCKS/main-duck';
import authReducer from './DUCKS/auth-duck';

//just trying to keep track of the structure, dont know if i'll actually use this.
interface stateSchema {
    main: {
        test: number
    },
    auth:{
        isAuthed: boolean | undefined
    }
}




const store = configureStore({
    reducer: {
        main: mainReducer,
        auth: authReducer
    },
    devTools: true,
    
})
export default store;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;