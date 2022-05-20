import { Color } from "@material-ui/lab/Alert";
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { closeSnackbar, pushToSnackbar } from "../actions/commonActions";

export interface ISnackbar {
    message: string
    severity?: Color
    isOpen: boolean
}

export type SnackbarActions = ActionType<typeof pushToSnackbar>;

export type SnackbarState = {
    snackbar: ISnackbar;
}

export const defaultSnackbar: SnackbarState = {
    snackbar: {
        message: '',
        severity: "success",
        isOpen: false
    }
}

export default combineReducers<SnackbarState, SnackbarActions>({
    snackbar: (state = defaultSnackbar.snackbar, action) => {
        switch (action.type) {
            case getType(pushToSnackbar): {
                return {
                    ...state,
                    message: action.payload.message,
                    severity: action.payload.severity,
                    isOpen: true
                }
            }
            case getType(closeSnackbar): {
                return {
                    ...state,
                    isOpen: false
                }
            }

            default: return state
        }
    }
})