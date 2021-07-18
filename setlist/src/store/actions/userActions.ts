import { createAsyncAction } from "typesafe-actions";
import { IUser } from "../../models";

export const getUser = createAsyncAction(
    "GET_USER_REQUEST",
    "GET_USER_SUCCESS",
    "GET_USER_FAILURE",
    "GET_USER_CANCEL",
)<string,IUser,Error,string>();