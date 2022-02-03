import React, { useEffect, useState } from "react";
import { ActionSheetIOS, Button, View } from 'react-native';
import { Platform } from 'react-native';
import { PropsFromRedux, connector } from './redux/connector';
import {authFlow} from './auth/Auth';


type Props = PropsFromRedux & {};

function SpotifyContainer(props: Props) {
    const {isAuthed, authObject, setAuthInSecureStore, getAuthFromSecureStore } = props;





    useEffect(() => {
        // if (authObject) {
        //     alert("Authed! Token is: " + authObject.accessToken)
        // }
    }, []);

    const AuthButton = () => {
        const onPress = () =>{
            setAuthInSecureStore(authFlow());
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
            </View>
        </>
    )
}









export default connector(SpotifyContainer);