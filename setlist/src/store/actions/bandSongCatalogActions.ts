import { createAsyncAction } from "typesafe-actions";
import {  IFilterBandSongActionProps, Catalog, IStatusBandSongCatalogActionProps } from "../../models";
import { ICatalogState } from "..";

export const fetchBandSongCatalog = createAsyncAction(
    "FETCH_BANDSONGCATALOG_REQUEST",
    "FETCH_BANDSONGCATALOG_SUCCESS",
    "FETCH_BANDSONGCATALOG_FAILURE",
    "FETCH_BANDSONGCATALOG_CANCEL",
)<IFilterBandSongActionProps,Catalog,Error,string>();

export const openBandSongsCatalog = createAsyncAction(
    `OPEN_BANDSONGCATALOG_REQUEST`,
    `OPEN_BANDSONGCATALOG_SUCCESS`,
    `OPEN_BANDSONGCATALOG_FAILURE`,
    `OPEN_BANDSONGCATALOG_CANCEL`,
)<IStatusBandSongCatalogActionProps, ICatalogState, Error, string>();

export const closeBandSongsCatalog = createAsyncAction(
    `CLOSE_BANDSONGCATALOG_REQUEST`,
    `CLOSE_BANDSONGCATALOG_SUCCESS`,
    `CLOSE_BANDSONGCATALOG_FAILURE`,
    `CLOSE_BANDSONGCATALOG_CANCEL`,
)<IStatusBandSongCatalogActionProps, ICatalogState, Error, string>();