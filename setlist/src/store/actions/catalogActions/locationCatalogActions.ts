import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterLocationActionProps, IFilterLocationActionResult } from "../../../models";

export const openLocationCatalog = createAction(
    'OPEN_LOCATION_CATALOG'
)();
export const closeLocationCatalog = createAction(
    'CLOSE_LOCATION_CATALOG'
)();

export const fetchLocationCatalog = createAsyncAction(
    "FETCH_LOCATION_CATALOG_REQUEST",
    "FETCH_LOCATION_CATALOG_SUCCESS",
    "FETCH_LOCATION_CATALOG_FAILURE",
    "FETCH_LOCATION_CATALOG_CANCEL",
)<IFilterLocationActionProps,IFilterLocationActionResult,Error,string>();