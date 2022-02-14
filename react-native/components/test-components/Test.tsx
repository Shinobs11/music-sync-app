import ax from 'axios';
import React, {useEffect} from 'react';
import {View,Button, Platform} from 'react-native';
import axios from 'axios';

export default function(){
    

    const onPress = () =>{
        try{
    (async ()=>{
    const res = await axios({
        method:'GET',
        url: "http://192.168.254.12:3000/api"
    })
    })();
    (async ()=>{
    const res = await axios({
        method:'POST',
        url: "http://192.168.254.12:3000/api",
        data: {
            text:"AHHHHHHHHH"
        }
    })
    console.log(res);
    })()}
    
    catch(e){
        console.warn(e);
    }
    }
    return(
        <>
            {/* <Button onPress={getUser} title="Test GET/POST"/>
            <SignIn/> */}
        </>
    )
}