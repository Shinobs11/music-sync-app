import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {testAction} from './actions';


//mapState
const mapStateToProps = (state: RootState)=>{
    const {main, auth} = state;
    
    return {test: main.test, isAuthed: auth.isAuthed, authObject:auth.authObject};
}
//mapDispatch
const mapDispatchToProps = {
    testAction
}
//connector
export const connector = connect(mapStateToProps, mapDispatchToProps);
//props type
export type PropsFromRedux = ConnectedProps<typeof connector>


