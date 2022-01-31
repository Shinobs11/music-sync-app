import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './DUCKS/main';



const store = configureStore({
    reducer: {
        main: mainReducer
    }
})
export default store;

//absolutely no clue what this is for

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;