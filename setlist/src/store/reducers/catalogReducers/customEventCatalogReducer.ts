import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { CustomEventCatalog } from "mapping";

import { ICustomEventCatalog } from "models";
import * as actions from "store/actions/catalogActions/customEventCatalogActions"
import * as common from "store/actions/commonActions"
import { MapHelper } from "utils";

export type CustomEventCatalogActions = ActionType<typeof common & typeof actions>;

export interface ICustomEventCatalogState {
    customEventCatalog: ICustomEventCatalog
}

const initial: ICustomEventCatalogState = {
    customEventCatalog: CustomEventCatalog.Create()
}

export default combineReducers<ICustomEventCatalogState, CustomEventCatalogActions>({
    customEventCatalog: (state = initial.customEventCatalog, action) => {
        switch (action.type) {
            case getType(actions.setCustomEventFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }
            case getType(actions.fetchCustomEventCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchCustomEventCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchCustomEventCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            case getType(actions.addCustomEventToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap(),
                    OData: { ...state.OData, Count: state.OData.Count + 1 }
                }
            case getType(actions.editCustomEventInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteCustomEventInCatalog.success): {
                const { Values } = state
                Values.delete(action.payload)

                return {
                    ...state,
                    Values,
                    OData: { ...state.OData, Count: state.OData.Count - 1 }
                }
            }
            default:
                return state;
        }
    }
})