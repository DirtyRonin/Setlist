
import { combineReducers } from "redux";
import { ActionType, getType, action } from "typesafe-actions";
import { HashTable } from "../../Util";
import { ISongCatalog, IBandSummary } from "../../models";

import * as catalogActions from "../actions/catalogActions";

export type CatalogActions = ActionType<typeof catalogActions>;

export type CatalogState = {
    catalogState:ICatalogState;
}

export interface ICatalogState{
    catalogs: HashTable<ISongCatalog>;
    catalogsOrder: string[];
}

export const defaultCatalog: CatalogState = {
    catalogState: { catalogsOrder: [] as string[], catalogs: {} as HashTable<ISongCatalog> } as ICatalogState
    // availableBandlists : {} as HashTable<IBandSummary>
}

export default combineReducers<CatalogState, CatalogActions>({
    catalogState: (state = defaultCatalog.catalogState, action) => {
        switch (action.type) {
            case getType(catalogActions.initialStateAsync.success):
                return {
                    ...state,
                    catalogs: action.payload.catalogs,
                    catalogsOrder: action.payload.catalogsOrder
                }
            case getType(catalogActions.newSongAsync.success):
                return { ...state, catalogs: action.payload }
            default:
                return state;
        }
    }
})