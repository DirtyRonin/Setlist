import { createAsyncAction } from "typesafe-actions";
import { IFilterBandActionProps, Catalogs } from "../../models";

export const fetchBandCatalog = createAsyncAction(
    "FETCH_BANDCATALOG_REQUEST",
    "FETCH_BANDCATALOG_SUCCESS",
    "FETCH_BANDCATALOG_FAILURE",
    "FETCH_BANDCATALOG_CANCEL",
)<IFilterBandActionProps,Catalogs,Error,string>();