import { createAsyncAction, createAction } from "typesafe-actions";
import { ICustomEvent, ICustomEventEntityActionProps, IFilterCustomEventActionProps, IFilterCustomEventActionResult, INextLinkActionProps } from "models";

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

export const addCustomEventToCatalog= createAsyncAction(
    "NEW_CUSTOM_EVENT_REQUEST",
    "NEW_CUSTOM_EVENT_SUCCESS",
    "NEW_CUSTOM_EVENT_FAILURE",
    "NEW_CUSTOM_EVENT_CANCEL",
)<ICustomEventEntityActionProps,ICustomEvent,Error,string>();

export const editCustomEventInCatalog= createAsyncAction(
    "EDIT_CUSTOM_EVENT_REQUEST",
    "EDIT_CUSTOM_EVENT_SUCCESS",
    "EDIT_CUSTOM_EVENT_FAILURE",
    "EDIT_CUSTOM_EVENT_CANCEL",
)<ICustomEventEntityActionProps,ICustomEvent,Error,string>();

export const deleteCustomEventInCatalog= createAsyncAction(
    "DELETE_CUSTOM_EVENT_REQUEST",
    "DELETE_CUSTOM_EVENT_SUCCESS",
    "DELETE_CUSTOM_EVENT_FAILURE",
    "DELETE_CUSTOM_EVENT_CANCEL",
)<ICustomEventEntityActionProps,string,Error,string>();

