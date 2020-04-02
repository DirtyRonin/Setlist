
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { HashTable } from "../../Util";
import { ISongCatalog, Catalogs } from "../../models";

import * as catalogActions from "../actions/catalogActions";

export type CatalogActions = ActionType<typeof catalogActions>;

export type CatalogState = {
    catalogState: ICatalogState;
}

export interface ICatalogState {
    catalogs: HashTable<Catalogs>;
    catalogsOrder: string[];
}

export const defaultCatalog: CatalogState = {
    catalogState: { catalogsOrder: [] as string[], catalogs: {} as HashTable<Catalogs> } 
    // availableBandlists : {} as HashTable<IBandSummary>
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
            case getType(catalogActions.fetchSongCatalog.success):
                return { ...state, catalogs: action.payload, } 
            case getType(catalogActions.newSong.success):
                return { ...state, catalogs: action.payload } 
            default:
                return state ;
        }
    }
})