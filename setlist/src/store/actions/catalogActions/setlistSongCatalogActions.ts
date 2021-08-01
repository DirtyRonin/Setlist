import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterSetlistSongActionProps, IFilterSetlistSongActionResult } from "../../../models";

export const openSetlistSongCatalog = createAction(
    'OPEN_SETLIST_SONG_CATALOG'
)();
export const closeSetlistSongCatalog = createAction(
    'CLOSE_SETLIST_SONG_CATALOG'
)();

export const setSetlistSongFilter= createAction(
    "SET_SETLIST_SONG_FILTER",
)<IFilterSetlistSongActionProps>();

export const fetchSetlistSongCatalog = createAsyncAction(
    "FETCH_SETLIST_SONG_CATALOG_REQUEST",
    "FETCH_SETLIST_SONG_CATALOG_SUCCESS",
    "FETCH_SETLIST_SONG_CATALOG_FAILURE",
    "FETCH_SETLIST_SONG_CATALOG_CANCEL",
)<IFilterSetlistSongActionProps,IFilterSetlistSongActionResult,Error,string>();