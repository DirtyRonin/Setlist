import { createAsyncAction, createAction } from "typesafe-actions";

import { IFilterBandActionProps, INextLinkActionProps, IFilterBandActionResult, IBandEntityActionProps, IBand } from "models";

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

export const addBandToCatalog= createAsyncAction(
    "NEW_BAND_REQUEST",
    "NEW_BAND_SUCCESS",
    "NEW_BAND_FAILURE",
    "NEW_BAND_CANCEL",
)<IBandEntityActionProps,IBand,Error,string>();

export const editBandInCatalog= createAsyncAction(
    "EDIT_BAND_REQUEST",
    "EDIT_BAND_SUCCESS",
    "EDIT_BAND_FAILURE",
    "EDIT_BAND_CANCEL",
)<IBandEntityActionProps,IBand,Error,string>();

export const deleteBandInCatalog= createAsyncAction(
    "DELETE_BAND_REQUEST",
    "DELETE_BAND_SUCCESS",
    "DELETE_BAND_FAILURE",
    "DELETE_BAND_CANCEL",
)<IBandEntityActionProps,number,Error,string>();

export const setBandFilter= createAction(
    "SET_BAND_FILTER",
)<IFilterBandActionProps>();