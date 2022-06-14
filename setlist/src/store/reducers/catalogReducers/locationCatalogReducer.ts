import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { MapHelper } from "utils";
import { LocationCatalog, Location } from "mapping";

import { ILocationCatalog } from "models";
import * as actions from "store/actions/catalogActions/locationCatalogActions"
import * as common from "store/actions/commonActions"
import { ILogoutAction, LOGOUT } from "store/auth/types";

export type LocationCatalogActions = ActionType<typeof common & typeof actions>;

export interface ILocationCatalogState {
    locationCatalog: ILocationCatalog
}

const initial: ILocationCatalogState = {
    locationCatalog: LocationCatalog.Create()
}

export default combineReducers<ILocationCatalogState, LocationCatalogActions | ILogoutAction>({
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
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchLocationCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addLocationToCatalog.success):
                {
                    const { Values } = state
                    Values.unshift(action.payload)

                    return {
                        ...state,
                        Values
                    }
                }
            case getType(actions.editLocationInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload.id)
                    Values[index] = action.payload

                    return {
                        ...state, Values
                    }
                }
            case getType(actions.deleteLocationInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload)
                    Values.splice(index, 1)

                    return {
                        ...state,
                        Values
                    }
                }
            case LOGOUT: {
                return initial.locationCatalog
            }


            default:
                return state;
        }
    }
})