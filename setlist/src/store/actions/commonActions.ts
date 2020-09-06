import { createAction } from "typesafe-actions";
import { ICatalogState } from "..";
import { IModal } from "../../models";

export const setCatalogState= createAction(
    "SET_CATALOG_STATE"
)<ICatalogState>();

export const setModal = createAction(
    "SET_MODAL"
)<IModal>();


