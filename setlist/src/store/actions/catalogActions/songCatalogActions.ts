import { createAction, createAsyncAction } from "typesafe-actions";
import { IFilterSongActionProps, ISongEntityActionProps, INextLinkActionProps, IModal, Catalog, IEntityActionProps, IStatusSongCatalogActionProps, ISongCatalog } from "../../../models";
import { ICatalogState } from "../..";

export const openSongCatalog_New = createAsyncAction(
    `OPEN_SONGCATALOG_NEW_REQUEST`,
    `OPEN_SONGCATALOG_NEW_SUCCESS`,
    `OPEN_SONGCATALOG_NEW_FAILURE`,
    `OPEN_SONGCATALOG_NEW_CANCEL`,
)<void, ISongCatalog, Error, string>();

export const openSongsCatalog = createAsyncAction(
    `OPEN_SONGCATALOG_REQUEST`,
    `OPEN_SONGCATALOG_SUCCESS`,
    `OPEN_SONGCATALOG_FAILURE`,
    `OPEN_SONGCATALOG_CANCEL`,
)<IStatusSongCatalogActionProps, ICatalogState, Error, string>();

export const closeSongsCatalog = createAsyncAction(
    `CLOSE_SONGCATALOG_REQUEST`,
    `CLOSE_SONGCATALOG_SUCCESS`,
    `CLOSE_SONGCATALOG_FAILURE`,
    `CLOSE_SONGCATALOG_CANCEL`,
)<IStatusSongCatalogActionProps, ICatalogState, Error, string>();

export const fetchSongCatalog = createAsyncAction(
    "FETCH_SONGCATALOG_REQUEST",
    "FETCH_SONGCATALOG_SUCCESS",
    "FETCH_SONGCATALOG_FAILURE",
    "FETCH_SONGCATALOG_CANCEL",
)<IFilterSongActionProps,ISongCatalog,Error,string>();

export const fetchSongCatalogNextLink = createAsyncAction(
    "FETCH_SONGCATALOG_NEXTLINK_REQUEST",
    "FETCH_SONGCATALOG_NEXTLINK_SUCCESS",
    "FETCH_SONGCATALOG_NEXTLINK_FAILURE",
    "FETCH_SONGCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,ISongCatalog,Error,string>();

export const setSongCatalogFilter = createAsyncAction(
    "SET_SONGCATALOG_FILTER_REQUEST",
    "SET_SONGCATALOG_FILTER_SUCCESS",
    "SET_SONGCATALOG_FILTER_FAILURE",
    "SET_SONGCATALOG_FILTER_CANCEL",
)<IFilterSongActionProps,Catalog,Error,string>();

export const addSongToCatalog= createAsyncAction(
    "NEW_SONG_REQUEST",
    "NEW_SONG_SUCCESS",
    "NEW_SONG_FAILURE",
    "NEW_SONG_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();

export const editSongInCatalog= createAsyncAction(
    "EDIT_SONG_REQUEST",
    "EDIT_SONG_SUCCESS",
    "EDIT_SONG_FAILURE",
    "EDIT_SONG_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();

export const deleteSongInCatalog= createAsyncAction(
    "DELETE_SONG_REQUEST",
    "DELETE_SONG_SUCCESS",
    "DELETE_SONG_FAILURE",
    "DELETE_SONG_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();

export const readSongInCatalog= createAction(
    "READ_SONG_REQUEST",
)();



