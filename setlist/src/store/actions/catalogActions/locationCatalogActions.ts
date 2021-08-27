import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterLocationActionProps, IFilterLocationActionResult, ILocation, ILocationEntityActionProps, INextLinkActionProps } from "../../../models";

export const fetchLocationCatalog = createAsyncAction(
    "FETCH_LOCATION_CATALOG_REQUEST",
    "FETCH_LOCATION_CATALOG_SUCCESS",
    "FETCH_LOCATION_CATALOG_FAILURE",
    "FETCH_LOCATION_CATALOG_CANCEL",
)<IFilterLocationActionProps,IFilterLocationActionResult,Error,string>();

export const fetchLocationCatalogNextLink = createAsyncAction(
    "FETCH_LOCATIONCATALOG_NEXTLINK_REQUEST",
    "FETCH_LOCATIONCATALOG_NEXTLINK_SUCCESS",
    "FETCH_LOCATIONCATALOG_NEXTLINK_FAILURE",
    "FETCH_LOCATIONCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,IFilterLocationActionResult,Error,string>();

export const addLocationToCatalog= createAsyncAction(
    "NEW_LOCATION_REQUEST",
    "NEW_LOCATION_SUCCESS",
    "NEW_LOCATION_FAILURE",
    "NEW_LOCATION_CANCEL",
)<ILocationEntityActionProps,ILocation,Error,string>();

export const editLocationInCatalog= createAsyncAction(
    "EDIT_LOCATION_REQUEST",
    "EDIT_LOCATION_SUCCESS",
    "EDIT_LOCATION_FAILURE",
    "EDIT_LOCATION_CANCEL",
)<ILocationEntityActionProps,ILocation,Error,string>();

export const deleteLocationInCatalog= createAsyncAction(
    "DELETE_LOCATION_REQUEST",
    "DELETE_LOCATION_SUCCESS",
    "DELETE_LOCATION_FAILURE",
    "DELETE_LOCATION_CANCEL",
)<ILocationEntityActionProps,string,Error,string>();

export const setLocationFilter= createAction(
    "SET_LOCATION_FILTER",
)<IFilterLocationActionProps>();
