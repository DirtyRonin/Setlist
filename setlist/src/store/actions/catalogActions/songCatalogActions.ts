import { createAction, createAsyncAction } from "typesafe-actions";
import { IFilterSongActionProps, INextLinkActionProps, ISong, IFilterSongActionResult, ISongEntityActionProps } from "models";

export const fetchSongCatalog = createAsyncAction(
    "FETCH_SONGCATALOG_REQUEST",
    "FETCH_SONGCATALOG_SUCCESS",
    "FETCH_SONGCATALOG_FAILURE",
    "FETCH_SONGCATALOG_CANCEL",
)<IFilterSongActionProps,IFilterSongActionResult,Error,string>();

export const fetchSongCatalogNextLink = createAsyncAction(
    "FETCH_SONGCATALOG_NEXTLINK_REQUEST",
    "FETCH_SONGCATALOG_NEXTLINK_SUCCESS",
    "FETCH_SONGCATALOG_NEXTLINK_FAILURE",
    "FETCH_SONGCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,IFilterSongActionResult,Error,string>();

export const addSongToCatalog= createAsyncAction(
    "NEW_SONG_REQUEST",
    "NEW_SONG_SUCCESS",
    "NEW_SONG_FAILURE",
    "NEW_SONG_CANCEL",
)<ISongEntityActionProps,ISong,Error,string>();

export const editSongInCatalog= createAsyncAction(
    "EDIT_SONG_REQUEST",
    "EDIT_SONG_SUCCESS",
    "EDIT_SONG_FAILURE",
    "EDIT_SONG_CANCEL",
)<ISongEntityActionProps,ISong,Error,string>();

export const deleteSongInCatalog= createAsyncAction(
    "DELETE_SONG_REQUEST",
    "DELETE_SONG_SUCCESS",
    "DELETE_SONG_FAILURE",
    "DELETE_SONG_CANCEL",
)<ISongEntityActionProps,number,Error,string>();

export const setSongFilter= createAction(
    "SET_SONG_FILTER",
)<IFilterSongActionProps>();





