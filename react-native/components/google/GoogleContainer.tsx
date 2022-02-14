import React from 'react';
import {View, Button} from 'react-native';
import { connector, PropsFromRedux } from './redux/connector';
import { googleAuthFlow } from './auth/GoogleAuth';
import { SessionEnum } from '../../constants/Auth';


type Props = PropsFromRedux & {};

const GoogleContainer =  (props:Props)=>{

    const {setAuthInSecureStore} = props;
    const onPress = ()=>{
        setAuthInSecureStore({payload: googleAuthFlow(), type: SessionEnum.googleSession});
    }
    




    return(
        <>
            <Button onPress = {onPress} title={"Google"}/>
        </>
    )
}
export default connector(GoogleContainer);