import { createAction } from "typesafe-actions";
import { ICatalogState } from "..";

export const setCatalogState= createAction(
    "SET_CATALOG_STATE"
)<ICatalogState>();


