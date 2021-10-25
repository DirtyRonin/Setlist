import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterSetlistActionProps, IFilterSetlistActionResult, INextLinkActionProps, ISetlist, ISetlistEntityActionProps, ISetlistSong } from "models";

export const fetchSetlistCatalog = createAsyncAction(
    "FETCH_SETLIST_CATALOG_REQUEST",
    "FETCH_SETLIST_CATALOG_SUCCESS",
    "FETCH_SETLIST_CATALOG_FAILURE",
    "FETCH_SETLIST_CATALOG_CANCEL",
)<IFilterSetlistActionProps, IFilterSetlistActionResult, Error, string>();

export const fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId = createAsyncAction(
    "FETCH_SETLIST_WITH_SETLISTSONGS_EXPANDED_BY_BANDSONGID_CATALOG_REQUEST",
    "FETCH_SETLIST_WITH_SETLISTSONGS_EXPANDED_BY_BANDSONGID_CATALOG_SUCCESS",
    "FETCH_SETLIST_WITH_SETLISTSONGS_EXPANDED_BY_BANDSONGID_CATALOG_FAILURE",
    "FETCH_SETLIST_WITH_SETLISTSONGS_EXPANDED_BY_BANDSONGID_CATALOG_CANCEL",
)<IFilterSetlistActionProps, IFilterSetlistActionResult, Error, string>();

export const fetchSetlistCatalogNextLink = createAsyncAction(
    "FETCH_SETLIST_CATALOG_NEXTLINK_REQUEST",
    "FETCH_SETLIST_CATALOG_NEXTLINK_SUCCESS",
    "FETCH_SETLIST_CATALOG_NEXTLINK_FAILURE",
    "FETCH_SETLIST_CATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps, IFilterSetlistActionResult, Error, string>();

export const addSetlistToCatalog = createAsyncAction(
    "NEW_SETLIST_REQUEST",
    "NEW_SETLIST_SUCCESS",
    "NEW_SETLIST_FAILURE",
    "NEW_SETLIST_CANCEL",
)<ISetlistEntityActionProps, ISetlist, Error, string>();


export const editSetlistInCatalog = createAsyncAction(
    "EDIT_SETLIST_REQUEST",
    "EDIT_SETLIST_SUCCESS",
    "EDIT_SETLIST_FAILURE",
    "EDIT_SETLIST_CANCEL",
)<ISetlistEntityActionProps, ISetlist, Error, string>();

export const deleteSetlistInCatalog = createAsyncAction(
    "DELETE_SETLIST_REQUEST",
    "DELETE_SETLIST_SUCCESS",
    "DELETE_SETLIST_FAILURE",
    "DELETE_SETLIST_CANCEL",
)<ISetlistEntityActionProps, number, Error, string>();

export const addBandSongToSetlistCatalog = createAction(
    "ADD_BANDSONG_TO_SETLIST",
)<ISetlistSong>();

export const setSetlistFilter = createAction(
    "SET_SETLIST_FILTER",
)<IFilterSetlistActionProps>();