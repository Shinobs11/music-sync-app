import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../../redux/store';
import * as actions from './actions';


//mapState
const mapStateToProps = (state: RootState)=>{
    const { auth} = state;
    return { isAuthed: auth.isAuthed, authObject:auth.authObject};
}
//mapDispatch
const mapDispatchToProps = {
    ...actions
}
//connector
export const connector = connect(mapStateToProps, mapDispatchToProps);
//props type
export type PropsFromRedux = ConnectedProps<typeof connector>


