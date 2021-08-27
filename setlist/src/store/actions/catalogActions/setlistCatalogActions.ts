import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterSetlistActionProps, IFilterSetlistActionResult, INextLinkActionProps, ISetlist, ISetlistEntityActionProps } from "models";

export const fetchSetlistCatalog = createAsyncAction(
    "FETCH_SETLIST_CATALOG_REQUEST",
    "FETCH_SETLIST_CATALOG_SUCCESS",
    "FETCH_SETLIST_CATALOG_FAILURE",
    "FETCH_SETLIST_CATALOG_CANCEL",
)<IFilterSetlistActionProps, IFilterSetlistActionResult, Error, string>();

export const fetchSetlistCatalogNextLink = createAsyncAction(
    "FETCH_SETLIST_CATALOG_NEXTLINK_REQUEST",
    "FETCH_SETLIST_CATALOG_NEXTLINK_SUCCESS",
    "FETCH_SETLIST_CATALOG_NEXTLINK_FAILURE",
    "FETCH_SETLIST_CATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps, IFilterSetlistActionResult, Error, string>();

export const addSetListToCatalog = createAsyncAction(
    "NEW_SETLIST_REQUEST",
    "NEW_SETLIST_SUCCESS",
    "NEW_SETLIST_FAILURE",
    "NEW_SETLIST_CANCEL",
)<ISetlistEntityActionProps, ISetlist, Error, string>();

export const editSetListInCatalog = createAsyncAction(
    "EDIT_SETLIST_REQUEST",
    "EDIT_SETLIST_SUCCESS",
    "EDIT_SETLIST_FAILURE",
    "EDIT_SETLIST_CANCEL",
)<ISetlistEntityActionProps, ISetlist, Error, string>();

export const deleteSetListInCatalog = createAsyncAction(
    "DELETE_SETLIST_REQUEST",
    "DELETE_SETLIST_SUCCESS",
    "DELETE_SETLIST_FAILURE",
    "DELETE_SETLIST_CANCEL",
)<ISetlistEntityActionProps, string, Error, string>();

export const setSetlistFilter = createAction(
    "SET_SETLIST_FILTER",
)<IFilterSetlistActionProps>();