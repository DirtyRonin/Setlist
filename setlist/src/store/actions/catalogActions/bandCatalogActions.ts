import { createAsyncAction, createAction } from "typesafe-actions";
import { IFilterBandActionProps, Catalog, INextLinkActionProps, IEntityActionProps, IStatusBandCatalogActionProps, IBandCatalog, IComponentOrder, IFilterBandActionResult } from "../../../models";
import { ICatalogState } from "../..";

// export const openBandsCatalog_New = createAsyncAction(
//     `OPEN_BANDCATALOG_NEW_REQUEST`,
//     `OPEN_BANDCATALOG_NEW_SUCCESS`,
//     `OPEN_BANDCATALOG_NEW_FAILURE`,
//     `OPEN_BANDCATALOG_NEW_CANCEL`,
// )<void, IBandCatalog, Error, string>();

export const openBandsCatalog = createAsyncAction(
    `OPEN_BANDCATALOG_REQUEST`,
    `OPEN_BANDCATALOG_SUCCESS`,
    `OPEN_BANDCATALOG_FAILURE`,
    `OPEN_BANDCATALOG_CANCEL`,
)<void, IComponentOrder, Error, string>();

export const closeBandsCatalog = createAsyncAction(
    `CLOSE_BANDCATALOG_REQUEST`,
    `CLOSE_BANDCATALOG_SUCCESS`,
    `CLOSE_BANDCATALOG_FAILURE`,
    `CLOSE_BANDCATALOG_CANCEL`,
)<IStatusBandCatalogActionProps, ICatalogState, Error, string>();

export const fetchBandCatalog = createAsyncAction(
    "FETCH_BANDCATALOG_REQUEST",
    "FETCH_BANDCATALOG_SUCCESS",
    "FETCH_BANDCATALOG_FAILURE",
    "FETCH_BANDCATALOG_CANCEL",
)<IFilterBandActionProps,IFilterBandActionResult,Error,string>();

export const fetchBandCatalogNextLink = createAsyncAction(
    "FETCH_BANDCATALOG_NEXTLINK_REQUEST",
    "FETCH_BANDCATALOG_NEXTLINK_SUCCESS",
    "FETCH_BANDCATALOG_NEXTLINK_FAILURE",
    "FETCH_BANDCATALOG_NEXTLINK_CANCEL",
)<INextLinkActionProps,IFilterBandActionResult,Error,string>();
/*
export const setSongCatalogFilter = createAsyncAction(
    "SET_SONGCATALOG_FILTER_REQUEST",
    "SET_SONGCATALOG_FILTER_SUCCESS",
    "SET_SONGCATALOG_FILTER_FAILURE",
    "SET_SONGCATALOG_FILTER_CANCEL",
)<IFilterSongActionProps,Catalog,Error,string>(); */

export const addBandToCatalog= createAsyncAction(
    "NEW_BAND_REQUEST",
    "NEW_BAND_SUCCESS",
    "NEW_BAND_FAILURE",
    "NEW_BAND_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();

export const editBandInCatalog= createAsyncAction(
    "EDIT_BAND_REQUEST",
    "EDIT_BAND_SUCCESS",
    "EDIT_BAND_FAILURE",
    "EDIT_BAND_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();

export const deleteBandInCatalog= createAsyncAction(
    "DELETE_BAND_REQUEST",
    "DELETE_BAND_SUCCESS",
    "DELETE_BAND_FAILURE",
    "DELETE_BAND_CANCEL",
)<IEntityActionProps,Catalog,Error,string>();



export const readBandInCatalog= createAction(
    "READ_BAND_REQUEST",
)();

export const setBandFilter= createAction(
    "SET_BAND_FILTER",
)<IFilterBandActionProps>();