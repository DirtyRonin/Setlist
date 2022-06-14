
import * as React from 'react';
import { connect } from 'react-redux';
import { History, Location } from 'history';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action from '../actions';
import { IUser } from '../../models';

import { IModelState } from "store/reducers/modalReducers"
import { IUserInfo } from 'store/auth/types';

interface IAppConnectedDispatch {
    // getUser(props: string): void
}
interface IProps {
    history: History
}

interface IStateProps extends IProps {
    userState: IUserInfo;
    modalState: IModelState
    location: Location<LocationState | undefined>
    isLoggedIn:boolean
}

type LocationState = {
    background: Location | undefined
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps => {
    return ({
        userState: { name: state.auth.name, isAdmin: state.auth.isAdmin },
        isLoggedIn: state.auth.isAuth,
        // i need modalstate here so the whole component will be updated - otherwise, only the modal withou the background will be rendered
        modalState: state.modalReducers.modalState,
        history: props.history,
        location: props.history.location
    } as IStateProps)
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        // getUser: (props: string) => dispatch(Action.getUser.request(props)),
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);