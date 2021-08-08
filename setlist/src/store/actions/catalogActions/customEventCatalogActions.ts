import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterCustomEventActionProps, IFilterCustomEventActionResult, INextLinkActionProps } from "../../../models";

export const openCustomEventCatalog = createAction(
    'OPEN_CUSTOM_EVENT_CATALOG'
)();
export const closeCustomEventCatalog = createAction(
    'CLOSE_CUSTOM_EVENT_CATALOG'
)();

export const setCustomEventFilter= createAction(
    "SET_CUSTOM_EVENT_FILTER",
)<IFilterCustomEventActionProps>();

export const fetchCustomEventCatalog = createAsyncAction(
    "FETCH_CUSTOM_EVENT_CATALOG_REQUEST",
    "FETCH_CUSTOM_EVENT_CATALOG_SUCCESS",
    "FETCH_CUSTOM_EVENT_CATALOG_FAILURE",
    "FETCH_CUSTOM_EVENT_CATALOG_CANCEL",
)<IFilterCustomEventActionProps,IFilterCustomEventActionResult,Error,string>();

export const fetchCustomEventCatalogNextLink = createAsyncAction(
    "FETCH_CUSTOM_EVENT_CATALOG_NEXTLINK_REQUEST",
    "FETCH_CUSTOM_EVENT_CATALOG_NEXTLINK_SUCCESS",
    "FETCH_CUSTOM_EVENT_CATALOG_NEXTLINK_FAILURE",
    "FETCH_CUSTOM_EVENT_CATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,IFilterCustomEventActionResult,Error,string>();