import { createAsyncAction, ActionType } from "typesafe-actions";

export const fetchAvailableBands = createAsyncAction(
    `FETCH_AVAILABLEBANDS_REQUEST`,
    `FETCH_AVAILABLEBANDS_SUCCESS`,
    `FETCH_AVAILABLEBANDS_FAILURE`,
    `FETCH_AVAILABLEBANDS_CANCEL`,
)<string, string[], Error, string>();



