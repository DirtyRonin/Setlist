import { createAction, createAsyncAction, action } from "typesafe-actions";
import { ICatalogState } from "..";
import { ISong, ISongCatalog, ISongFilter, IFilterSongActionProps, ISongActionProps, INextLinkActionProps, Catalogs, IModal } from "../../models";
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

export const fetchSongCatalogNextLink = createAsyncAction(
    "FETCH_SONGCATALOG_NEXTLINK_REQUEST",
    "FETCH_SONGCATALOG_NEXTLINK_SUCCESS",
    "FETCH_SONGCATALOG_NEXTLINK_FAILURE",
    "FETCH_SONGCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,HashTable<ISongCatalog>,Error,string>();

export const setSongCatalogFilter = createAsyncAction(
    "SET_SONGCATALOG_FILTER_REQUEST",
    "SET_SONGCATALOG_FILTER_SUCCESS",
    "SET_SONGCATALOG_FILTER_FAILURE",
    "SET_SONGCATALOG_FILTER_CANCEL",
)<IFilterSongActionProps,HashTable<ISongCatalog>,Error,string>();

export const addSongToCatalog= createAsyncAction(
    "NEW_SONG_REQUEST",
    "NEW_SONG_SUCCESS",
    "NEW_SONG_FAILURE",
    "NEW_SONG_CANCEL",
)<ISongActionProps,HashTable<ISongCatalog>,Error,string>();

export const editSongInCatalog= createAsyncAction(
    "EDIT_SONG_REQUEST",
    "EDIT_SONG_SUCCESS",
    "EDIT_SONG_FAILURE",
    "EDIT_SONG_CANCEL",
)<ISongActionProps,HashTable<ISongCatalog>,Error,string>();

export const deleteSongInCatalog= createAsyncAction(
    "DELETE_SONG_REQUEST",
    "DELETE_SONG_SUCCESS",
    "DELETE_SONG_FAILURE",
    "DELETE_SONG_CANCEL",
)<ISongActionProps,HashTable<ISongCatalog>,Error,string>();

export const readSongInCatalog= createAction(
    "READ_SONG_REQUEST",
)();



export const setSongModal = createAction(
    "SET_SONG_MODAL"
)<IModal>();
