import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { MapHelper } from "utils";
import { LocationCatalog, Location } from "mapping";

import { ILocationCatalog } from "models";
import * as actions from "store/actions/catalogActions/locationCatalogActions"
import * as common from "store/actions/commonActions"

export type LocationCatalogActions = ActionType<typeof common & typeof actions>;

export interface ILocationCatalogState {
    locationCatalog: ILocationCatalog
}

const initial: ILocationCatalogState = {
    locationCatalog: LocationCatalog.Create()
}

export default combineReducers<ILocationCatalogState, LocationCatalogActions>({
    locationCatalog: (state = initial.locationCatalog, action) => {
        switch (action.type) {
            case getType(actions.setLocationFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }
            case getType(actions.fetchLocationCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchLocationCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchLocationCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            case getType(actions.addLocationToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap()
                }
            case getType(actions.editLocationInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteLocationInCatalog.success): {
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