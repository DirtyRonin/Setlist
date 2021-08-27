import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { SetlistCatalog } from "mapping";
import { ISetlistCatalog } from "models";
import { MapHelper } from "utils";

import * as actions from "store/actions/catalogActions/setlistCatalogActions"

export type SetlistCatalogActions = ActionType<typeof actions>;

export interface ISetlistCatalogState {
    setlistCatalog: ISetlistCatalog
}

const initial: ISetlistCatalogState = {
    setlistCatalog: SetlistCatalog.Create()
}

export default combineReducers<ISetlistCatalogState, SetlistCatalogActions>({
    setlistCatalog: (state = initial.setlistCatalog, action) => {
        switch (action.type) {
            case getType(actions.setSetlistFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }
            case getType(actions.fetchSetlistCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchSetlistCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchSetlistCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            case getType(actions.addSetListToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap()
                }
            case getType(actions.editSetListInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteSetListInCatalog.success): {
                const { Values } = state
                Values.delete(action.payload)
                return {
                    ...state,
                    Values
                }
            }
            default:
                return state;
        }
    }
})