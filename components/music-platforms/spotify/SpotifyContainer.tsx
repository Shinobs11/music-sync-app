import React, {useEffect, useState} from "react";
import {View} from 'react-native';
import {getAuthSession} from './auth/Auth';
import {Platform} from 'react-native';
import { SpotifySession } from "react-native-spotify-remote";
function SpotifyContainer(){
    useEffect(()=>{
        // alert("SpotifyContainer: UseEffect works.");
    //     if(Platform!=null){
    //     if(Platform.OS!= null){        
    //     getAuthSession()
    //     .then((res:Promise<SpotifySession>)=>{alert(res)})
    //     }
    // }
    })
    return(
        <>
        
        </>
    )
}

export default SpotifyContainer;