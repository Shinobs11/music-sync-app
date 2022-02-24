import React, { useEffect, useState } from "react";
import { Button, View } from 'react-native';

import { PropsFromRedux, connector } from './redux/connector';
import { spotifyWebAuthFlow } from './auth/SpotifyWebAuth';
import SpotifyPlayer from './player/SpotifyPlayer';

import { SessionEnum } from '../../../constants/Auth';

type Props = PropsFromRedux & {};

function SpotifyContainer(props: Props) {
    const { isAuthed, authObject, setAuthInSecureStore, getAuthFromSecureStore, deleteAuthInSecureStore, updateAuthState } = props;

    //!! THINK OF A BETTER WAY TO DO THIS UGGHHHHHHHHH
    const onPress = async () => {
        updateAuthState({await spotifyWebAuthFlow()});
    }
    console.log(authObject)
    console.log(isAuthed)

    useEffect(() => {

    }, []);


    return (
        <>
            {isAuthed[SessionEnum.spotifyWebSession] ?
                <></> : <Button
                    onPress={onPress}
                    title="Login to Spotify"
                />

            }

            <Button onPress={() => { console.log(authObject) }} title="Log Auth object" />
            <Button onPress={() => { deleteAuthInSecureStore() }} title="Test delete function/Test get" />
            <SpotifyPlayer authObject={authObject} />

        </>
    )
}









export default connector(SpotifyContainer);