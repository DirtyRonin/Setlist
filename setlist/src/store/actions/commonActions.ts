import { createAction, createAsyncAction } from "typesafe-actions";
import { ICatalogState } from "..";
import { IModal, IComponentOrder, IComponentOrderActionProps } from "../../models";

// export const setModal = createAction(
//     "SET_MODAL"
// )<IModal>();

export const pushComponent = createAction(
    "PUSH_COMPONENT"
)<IComponentOrder>();

export const pushCatalogComponentOrder = createAsyncAction(
    "PUSH_CATALOG_COMMON_COMPONENTORDER_REQUEST",
    "PUSH_CATALOG_COMMON_COMPONENTORDER_SUCCESS",
    "PUSH_CATALOG_COMMON_COMPONENTORDER_FAILURE",
    "PUSH_CATALOG_COMMON_COMPONENTORDER_CANCEL",
)<IComponentOrderActionProps,IComponentOrder[],Error,string>();

export const pushComponentOrder = createAsyncAction(
    "PUSH_COMMON_COMPONENTORDER_REQUEST",
    "PUSH_COMMON_COMPONENTORDER_SUCCESS",
    "PUSH_COMMON_COMPONENTORDER_FAILURE",
    "PUSH_COMMON_COMPONENTORDER_CANCEL",
)<IComponentOrderActionProps,IComponentOrder[],Error,string>();

export const popComponentOrder = createAsyncAction(
    "POP_COMMON_COMPONENTORDER_REQUEST",
    "POP_COMMON_COMPONENTORDER_SUCCESS",
    "POP_COMMON_COMPONENTORDER_FAILURE",
    "POP_COMMON_COMPONENTORDER_CANCEL",
)<void,IComponentOrder[],Error,string>();


