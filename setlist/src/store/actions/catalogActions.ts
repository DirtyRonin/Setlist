import { createAction, createAsyncAction, action } from "typesafe-actions";
import { ICatalogState } from "..";
import { ISong, ISongCatalog, ISongFilter, IFilterSongActionProps, INewSongActionProps } from "../../models";
import { HashTable } from "../../Util";

export const setCatalogState= createAction(
    "SET_CATALOG_STATE"
)<ICatalogState>();

export const fetchSongCatalog = createAsyncAction(
    "FETCH_SONGCATALOG_REQUEST",
    "FETCH_SONGCATALOG_SUCCESS",
    "FETCH_SONGCATALOG_FAILURE",
    "FETCH_SONGCATALOG_CANCEL",
)<IFilterSongActionProps,HashTable<ISongCatalog>,Error,string>();

export const setSongCatalogFilter = createAsyncAction(
    "SET_SONGCATALOG_FILTER_REQUEST",
    "SET_SONGCATALOG_FILTER_SUCCESS",
    "SET_SONGCATALOG_FILTER_FAILURE",
    "SET_SONGCATALOG_FILTER_CANCEL",
)<IFilterSongActionProps,HashTable<ISongCatalog>,Error,string>();

export const newSong= createAsyncAction(
    "NEW_SONG_REQUEST",
    "NEW_SONG_SUCCESS",
    "NEW_SONG_FAILURE",
    "NEW_SONG_CANCEL",
)<INewSongActionProps,HashTable<ISongCatalog>,Error,string>();
