import React, { useEffect, useState } from "react";
import { ActionSheetIOS, Button, View } from 'react-native';
import { authHook } from './auth/Auth';
import { Platform } from 'react-native';
import {PropsFromRedux, connector} from './redux/connector';
import {testAction} from './redux/actions';

type Props = PropsFromRedux & {};

function SpotifyContainer(props: Props) {
    const {test} = props;

    let [isAuthed, setAuthed] = useState(Boolean);

    useEffect(() => {
        // alert("SpotifyContainer: UseEffect works.");
    },[]);

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
        <Button onPress={()=>{testAction(1+test)}} title="press"/>
        </>
    )
}









export default connector(SpotifyContainer);