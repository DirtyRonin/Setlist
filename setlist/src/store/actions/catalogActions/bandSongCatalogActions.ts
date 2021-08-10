import { createAsyncAction, createAction } from "typesafe-actions";
import {  IFilterBandSongActionProps, Catalog, INextLinkActionProps, IFilterBandSongActionResult, IBandSongEntityActionProps, IBandSong } from "../../../models";

export const openBandSongsCatalog = createAction(
    "OPEN_BANDSONG_CATALOG",
)<string>();
export const closeBandSongsCatalog = createAction(
    "CLOSE_BANDSONG_CATALOG",
)();

export const fetchBandSongCatalog = createAsyncAction(
    "FETCH_BANDSONGCATALOG_REQUEST",
    "FETCH_BANDSONGCATALOG_SUCCESS",
    "FETCH_BANDSONGCATALOG_FAILURE",
    "FETCH_BANDSONGCATALOG_CANCEL",
)<IFilterBandSongActionProps,IFilterBandSongActionResult,Error,string>();

export const fetchBandSongCatalogNextLink = createAsyncAction(
    "FETCH_BANDSONGCATALOG_NEXTLINK_REQUEST",
    "FETCH_BANDSONGCATALOG_NEXTLINK_SUCCESS",
    "FETCH_BANDSONGCATALOG_NEXTLINK_FAILURE",
    "FETCH_BANDSONGCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,IFilterBandSongActionResult,Error,string>();

export const addBandSongToCatalog= createAsyncAction(
    "NEW_BANDSONG_REQUEST",
    "NEW_BANDSONG_SUCCESS",
    "NEW_BANDSONG_FAILURE",
    "NEW_BANDSONG_CANCEL",
)<IBandSongEntityActionProps,IBandSong,Error,string>();

export const editBandSongInCatalog= createAsyncAction(
    "EDIT_BANDSONG_REQUEST",
    "EDIT_BANDSONG_SUCCESS",
    "EDIT_BANDSONG_FAILURE",
    "EDIT_BANDSONG_CANCEL",
)<IBandSongEntityActionProps,IBandSong,Error,string>();

export const deleteBandSongInCatalog= createAsyncAction(
    "DELETE_BANDSONG_REQUEST",
    "DELETE_BANDSONG_SUCCESS",
    "DELETE_BANDSONG_FAILURE",
    "DELETE_BANDSONG_CANCEL",
)<IBandSongEntityActionProps,Catalog,Error,string>();

export const readBandSongInCatalog= createAction(
    "READ_BANDSONG_REQUEST",
)();

export const setBandSongFilter= createAction(
    "SET_BandSONG_FILTER",
)<IFilterBandSongActionProps>();