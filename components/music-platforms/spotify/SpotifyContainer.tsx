import React, { useEffect, useState } from "react";
import { Button, View } from 'react-native';
import { authHook } from './auth/Auth';
import { Platform } from 'react-native';
import { SpotifySession } from "react-native-spotify-remote";
import { AuthRequest } from "expo-auth-session";
function SpotifyContainer() {


    let [isAuthed, setAuthed] = useState(Boolean)

    useEffect(() => {
        // alert("SpotifyContainer: UseEffect works.");
        
    }, [])
    var [req, res, promptAsync] = authHook();


    let AuthButton = () => {
        if(!isAuthed){
        return <Button //TODOS: Accessibility options should be implemented towards the completion of the project
                //TODOS: Still need to implement conditionals based on OS
                onPress={() => { promptAsync().then }}
                title="Login to Spotify"
            />
        }
        else return (<></>)
    }



    return (
        <>
        <AuthButton/>
        </>
    )
}

export default SpotifyContainer;