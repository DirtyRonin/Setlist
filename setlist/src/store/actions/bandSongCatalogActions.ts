import { createAsyncAction, createAction } from "typesafe-actions";
import { IEntityActionProps, Catalog } from "../../models";

export const showBandSongsCatalog= createAction(
    "SHOW_BANDSONGS_CATALOG_REQUEST",
)<string,boolean>();