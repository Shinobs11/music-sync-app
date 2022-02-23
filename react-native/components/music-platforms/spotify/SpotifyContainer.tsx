import React, { useEffect, useState } from "react";
import { Button, View } from 'react-native';

import { PropsFromRedux, connector } from './redux/connector';
import { spotifyWebAuthFlow } from './auth/SpotifyWebAuth';
import SpotifyPlayer from './player/SpotifyPlayer';

import { SessionEnum } from '../../../constants/Auth';

type Props = PropsFromRedux & {};

function SpotifyContainer(props: Props) {
    const { isAuthed, authObject, setAuthInSecureStore, getAuthFromSecureStore, deleteAuthInSecureStore } = props;


    const onPress = () => {
        setAuthInSecureStore({ payload: spotifyWebAuthFlow(), type: SessionEnum.spotifyWebSession });
    }


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