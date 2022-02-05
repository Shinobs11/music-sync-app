import React, {useEffect} from 'react';
import {View, Platform, Button} from 'react-native';
import {SpotifySession, ApiScope} from 'react-native-spotify-remote';
import {NonSerializedTokenResponse} from '../../../../types/authTypes';
import axios from 'axios';


function SpotifyPlayer(props:any){

    const authObject:NonSerializedTokenResponse = props.authObject;
    
    const sessConfig = ():SpotifySession => {
        const expiration = (authObject.expiresIn.valueOf() + authObject.issuedAt.valueOf());
        return({
        accessToken: authObject.accessToken,
        expirationDate: expiration.toString(),
        expired: ((new Date).getTime() > expiration),
        refreshToken: authObject.refreshToken,
        //TODOs: ios only scopes field
        } as SpotifySession)
    }

    const getTracks = async () => {

        try{
// ugh

        const res = console.log(await axios({
            method:'get',
            url:'https://api.spotify.com/v1/me/top/tracks',
            data:{
                limit: 10,
                offset: 0,
                time_range:"medium_term"
            },
            headers:{
                Authorization: authObject.accessToken,
                "Content-Type": "application/json"
            }
        }))
    }
    catch(e){
        console.warn(e);
    }


    }


    return(
    <>
    <Button onPress={()=>{getTracks()}} title="Get tracks"/>
    </>
    )



}



export default SpotifyPlayer;




