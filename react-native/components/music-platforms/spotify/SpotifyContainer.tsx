import React, { useEffect, useState } from "react";
import { ActionSheetIOS, Button, View } from 'react-native';
import { Platform } from 'react-native';
import { PropsFromRedux, connector } from './redux/connector';
import {authFlow} from './auth/SpotifyWebAuth';
import SpotifyPlayer from './player/SpotifyPlayer';
import { TokenResponse } from 'expo-auth-session';
import { SessionEnum } from '../../../constants/Auth';


type Props = PropsFromRedux & {};

function SpotifyContainer(props: Props) {
    const {isAuthed, authObject, setAuthInSecureStore, getAuthFromSecureStore, deleteAuthInSecureStore } = props;





    useEffect(() => {
        
    }, []);

    const AuthButton = () => {
        const onPress = () =>{
            setAuthInSecureStore(authFlow() as Promise<TokenResponse>);
        }
        if (!isAuthed) {
            return (
                <>
                    <Button
                        onPress={onPress}
                        title="Login to Spotify"
                    />
                </>)
        }
        else return (<></>)
    }

    return (
        <>
            <View>
                {AuthButton()}
                <Button onPress={()=>{console.log(authObject)}} title="Log Auth object"/>
                <Button onPress={()=>{deleteAuthInSecureStore()}} title="Test delete function/Test get"/>
                <SpotifyPlayer authObject={authObject as Record<string, any>[SessionEnum.spotifyLocalSession]}/>
            </View>
        </>
    )
}









export default connector(SpotifyContainer);