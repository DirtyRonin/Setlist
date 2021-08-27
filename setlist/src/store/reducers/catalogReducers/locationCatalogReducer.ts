import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { LocationCatalog } from "../../../mapping";

import { ILocationCatalog } from "../../../models";
import * as actions from "../../actions/catalogActions/locationCatalogActions"
import * as common from "../../actions/commonActions"

export type LocationCatalogActions = ActionType<typeof common & typeof actions>;

export interface ILocationCatalogState{
    locationCatalog : ILocationCatalog
}

const initial : ILocationCatalogState = {
    locationCatalog : LocationCatalog.Create()
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
           
            default:
                return state;
        }
    }
})