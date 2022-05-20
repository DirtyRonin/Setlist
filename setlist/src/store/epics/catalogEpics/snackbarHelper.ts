import { ISnackbarActionProps } from "models/actions";
import * as commonActions from "store/actions/commonActions";

export const FETCHING_COMPLETED = 'Fetching Completed'
export const CREATING_COMPLETED = 'Creating Completed'
export const DELETING_COMPLETED = 'Deleting Completed'
export const UPDATING_COMPLETED = 'Updating Completed'
export const FETCHING_FAILED = 'Fetching Failed'
export const CREATING_FAILED = 'Creating Failed'
export const DELETING_FAILED = 'Deleting Failed'
export const UPDATING_FAILED = 'Updating Failed'


const fetchingCompleted = commonActions.pushToSnackbar({ message: FETCHING_COMPLETED })
const creatingCompleted = commonActions.pushToSnackbar({ message: CREATING_COMPLETED })
const deletingCompleted = commonActions.pushToSnackbar({ message: DELETING_COMPLETED })
const updatingCompleted = commonActions.pushToSnackbar({ message: UPDATING_COMPLETED })

const fetchingFailed = commonActions.pushToSnackbar({ message: FETCHING_FAILED, severity: "error" })
const creatingFailed = commonActions.pushToSnackbar({ message: CREATING_FAILED, severity: "error" })
const deletingFailed = commonActions.pushToSnackbar({ message: DELETING_FAILED, severity: "error" })
const updatingFailed = commonActions.pushToSnackbar({ message: UPDATING_FAILED, severity: "error" })

const customSnack = (props: ISnackbarActionProps) => commonActions.pushToSnackbar({ message: props.message, severity: props.severity })

export {
    fetchingCompleted,
    creatingCompleted,
    deletingCompleted,
    updatingCompleted,
    fetchingFailed,
    creatingFailed,
    deletingFailed,
    updatingFailed,
    customSnack
}