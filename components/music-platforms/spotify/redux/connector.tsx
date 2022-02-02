import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {testAction} from './actions';


//mapState
const mapStateToProps = (state: RootState)=>{
    const {main} = state;
    return {test: main.test};
}
//mapDispatch
const mapDispatchToProps = {
    testAction
}
//connector
export const connector = connect(mapStateToProps, mapDispatchToProps);
//props type
export type PropsFromRedux = ConnectedProps<typeof connector>


