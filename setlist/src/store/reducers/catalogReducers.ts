
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { HashTable } from "../../Util";
import { Catalog, IModal, defaultModal } from "../../models";

import * as catalogActions from "../actions/";

export type CatalogActions = ActionType<typeof catalogActions>;

export type CatalogState = {
    catalogState: ICatalogState;
}

export interface ICatalogState {
    catalogs: HashTable<Catalog>;
    catalogsOrder: string[];
    modal: IModal
}

export const defaultCatalog: CatalogState = {
    catalogState: {
        catalogsOrder: [] as string[],
        catalogs: {} as HashTable<Catalog>,
        modal: defaultModal
    }
}

export default combineReducers<CatalogState, CatalogActions>({
    catalogState: (state = defaultCatalog.catalogState, action) => {
        switch (action.type) {
            case getType(catalogActions.setCatalogState):
                return {
                    ...state,
                    catalogs: action.payload.catalogs,
                    catalogsOrder: action.payload.catalogsOrder
                }
            
            case getType(catalogActions.fetchBandCatalog.success): return updateCatalog(state, action.payload)
            case getType(catalogActions.fetchBandCatalogNextLink.success): return updateCatalog(state, action.payload)
            case getType(catalogActions.addBandToCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.deleteBandInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.editBandInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.readBandInCatalog): return setModal(state, defaultModal)

            case getType(catalogActions.fetchSongCatalog.success): return updateCatalog(state, action.payload)
            case getType(catalogActions.fetchSongCatalogNextLink.success): return updateCatalog(state, action.payload)
            case getType(catalogActions.addSongToCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.deleteSongInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.editSongInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.readSongInCatalog): return setModal(state, defaultModal)

            case getType(catalogActions.setModal): return setModal(state, action.payload)

            default:
                return state;
        }
    }
})

const updateCatalog = (state: ICatalogState, payload: Catalog): ICatalogState => {
    return {
        ...state, catalogs: {
            ...state.catalogs, [payload.Id]: payload
        }
    }
}

const updateCatalogByModal = (state: ICatalogState, payload: Catalog): ICatalogState => {
    return {
        ...state, catalogs: {
            ...state.catalogs, [payload.Id]: payload
        },
        modal: defaultModal
    }
}

const setModal = (state: ICatalogState, modal: IModal): ICatalogState => {
    return {
        ...state,
        modal
    }
}

