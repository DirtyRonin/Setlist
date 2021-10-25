import { createAsyncAction, createAction } from "typesafe-actions";

import { IFilterSetlistSongActionProps, IFilterSetlistSongActionResult, INextLinkActionProps, ISetlistSong, ISetlistSongEntityActionProps } from "models";

export const setSetlistIdForSetlistSong = createAction(
    'SET_SETLISTID_FOR_SETLISTSONG'
)<number>();

export const fetchSetlistSongCatalog = createAsyncAction(
    "FETCH_SETLISTSONG_REQUEST",
    "FETCH_SETLISTSONG_SUCCESS",
    "FETCH_SETLISTSONG_FAILURE",
    "FETCH_SETLISTSONG_CANCEL",
)<IFilterSetlistSongActionProps, IFilterSetlistSongActionResult, Error, string>();

export const fetchSetlistSongCatalogNextLink = createAsyncAction(
    "FETCH_SETLISTSONG_NEXTLINK_REQUEST",
    "FETCH_SETLISTSONG_NEXTLINK_SUCCESS",
    "FETCH_SETLISTSONG_NEXTLINK_FAILURE",
    "FETCH_SETLISTSONG_NEXTLINK_CANCEL",
)<INextLinkActionProps, IFilterSetlistSongActionResult, Error, string>();

export const addSetlistSongToCatalog= createAsyncAction(
    "NEW_SETLISTSONG_REQUEST",
    "NEW_SETLISTSONG_SUCCESS",
    "NEW_SETLISTSONG_FAILURE",
    "NEW_SETLISTSONG_CANCEL",
)<ISetlistSongEntityActionProps,ISetlistSong,Error,string>();

export const editSetlistSongInCatalog= createAsyncAction(
    "EDIT_SETLISTSONG_REQUEST",
    "EDIT_SETLISTSONG_SUCCESS",
    "EDIT_SETLISTSONG_FAILURE",
    "EDIT_SETLISTSONG_CANCEL",
)<ISetlistSongEntityActionProps,ISetlistSong,Error,string>();

export const deleteSetlistSongInCatalog= createAsyncAction(
    "DELETE_SETLISTSONG_REQUEST",
    "DELETE_SETLISTSONG_SUCCESS",
    "DELETE_SETLISTSONG_FAILURE",
    "DELETE_SETLISTSONG_CANCEL",
)<ISetlistSongEntityActionProps,number,Error,string>();

export const setSetlistSongFilter = createAction(
    "SET_SETLIST_SONG_FILTER",
)<IFilterSetlistSongActionProps>();