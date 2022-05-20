import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';
import { ISnackbarActionProps } from 'models';
import { closeSnackbar, pushToSnackbar } from "../../actions/commonActions"
import { ISnackbar } from 'store/reducers/snackbarReducer';
import SimpleSnackbar from 'components/common/snackbar/snackbar';


interface IConnectedDispatch {
    pushToSnackbar: (props: ISnackbarActionProps) => void
    closeSnackbar: () => void
}

interface IState {
    snackbar: ISnackbar
}

export type SnackbarProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState): IState =>
({
    snackbar: state.snackbarReducer.snackbar,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({

    pushToSnackbar: (props: ISnackbarActionProps) => dispatch(pushToSnackbar(props)),
    closeSnackbar: () => dispatch(closeSnackbar())
})

const SnackbarCatalog = (props: SnackbarProps) => (
    <>
        <SimpleSnackbar {...props} />
    </>
)

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarCatalog);

