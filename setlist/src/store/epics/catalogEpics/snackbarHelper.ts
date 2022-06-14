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
export const AUTHORIZATION_MISSING = 'No Authorization'
export const NO_ADMIN_RIGHTS = 'You are no Admin'
export const IN_USE = 'Item is still in Use'

const customSnack = (props: ISnackbarActionProps) => commonActions.pushToSnackbar({ message: props.message, severity: props.severity })

const fetchingCompleted = customSnack({ message: FETCHING_COMPLETED })
const creatingCompleted = customSnack({ message: CREATING_COMPLETED })
const deletingCompleted = customSnack({ message: DELETING_COMPLETED })
const updatingCompleted = customSnack({ message: UPDATING_COMPLETED })

const fetchingFailed = (status: number, message?: string) => customSnack(
    { message: selectErrorMessage(status, FETCHING_FAILED, message), severity: "error" }
)
const creatingFailed = (status: number, message?: string) => customSnack(
    { message: selectErrorMessage(status, CREATING_FAILED, message), severity: "error" }
)
const deletingFailed = (status: number, message?: string) => customSnack(
    { message: selectErrorMessage(status, DELETING_FAILED, message), severity: "error" }
)
const updatingFailed = (status: number, message?: string) => customSnack(
    { message: selectErrorMessage(status, UPDATING_FAILED, message), severity: "error" }
)

// const authorizationMissing = customSnack({ message: AUTHORIZATION_MISSING, severity: "error" })


const checkAuthorization = (status: number): boolean => status === 403
const checkConstraintsViolation = (message: string): boolean => message.startsWith('SQLSTATE[23000]: Integrity constraint violation: 1451')


const selectErrorMessage = (status: number, defaulMessage: string, message?: string): string => {
    if (checkAuthorization(status))
        return AUTHORIZATION_MISSING

    if (message && checkConstraintsViolation(message))
        return IN_USE

    return defaulMessage
}

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