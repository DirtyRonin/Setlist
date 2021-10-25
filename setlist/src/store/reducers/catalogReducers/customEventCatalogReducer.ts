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
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchCustomEventCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    Meta: action.payload.Meta
                }
            case getType(actions.addCustomEventToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.id, action.payload)
                        .GetMap(),
                    Meta: { ...state.Meta, Count: state.Meta.Count + 1 }
                }
            case getType(actions.editCustomEventInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.id, action.payload)
                }
            case getType(actions.deleteCustomEventInCatalog.success): {
                const { Values } = state
                Values.delete(action.payload)

                return {
                    ...state,
                    Values,
                    Meta: { ...state.Meta, Count: state.Meta.Count - 1 }
                }
            }
            default:
                return state;
        }
    }
})