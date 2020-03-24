import { createAction, createAsyncAction, action } from "typesafe-actions";
import { ICatalogState } from "..";
import { ISong } from "../../models";

export const fetchSongCatalogsAsync= createAsyncAction(
    "FETCH_SONG_CATALOG_REQUEST",
    "FETCH_SONG_CATALOG_SUCCESS",
    "FETCH_SONG_CATALOG_FAILURE",
    "FETCH_SONG_CATALOG_CANCEL",
)<void,ICatalogState,Error,string>();

export const AddSongAsync= createAsyncAction(
    "ADD_SONG_REQUEST",
    "ADD_SONG_SUCCESS",
    "ADD_SONG_FAILURE",
    "ADD_SONG_CANCEL",
)<ISong,ISong,Error,string>();

