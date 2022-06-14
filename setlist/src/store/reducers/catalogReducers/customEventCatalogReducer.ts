import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { CustomEventCatalog } from "mapping";

import { ICustomEventCatalog } from "models";
import * as actions from "store/actions/catalogActions/customEventCatalogActions"
import * as common from "store/actions/commonActions"
import { MapHelper } from "utils";
import { ILogoutAction, LOGOUT } from "store/auth/types";

export type CustomEventCatalogActions = ActionType<typeof common & typeof actions>;

export interface ICustomEventCatalogState {
    customEventCatalog: ICustomEventCatalog
}

const initial: ICustomEventCatalogState = {
    customEventCatalog: CustomEventCatalog.Create()
}

export default combineReducers<ICustomEventCatalogState, CustomEventCatalogActions | ILogoutAction>({
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
                    Values: [...state.Values, ...action.payload.Values],
                    Meta: action.payload.Meta
                }
            case getType(actions.addCustomEventToCatalog.success):
                return {
                    ...state,
                    Values: [action.payload, ...state.Values],
                    Meta: { ...state.Meta, Count: state.Meta.Count + 1 }
                }
            case getType(actions.editCustomEventInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.map(x => x.id != action.payload.id ? x : action.payload)
                }
            case getType(actions.deleteCustomEventInCatalog.success): {
                return {
                    ...state,
                    Values: state.Values.filter(_ => _.id !== action.payload),
                    Meta: { ...state.Meta, Count: state.Meta.Count - 1 }
                }
            }
            case LOGOUT: {
                return initial.customEventCatalog
            }
            default:
                return state;
        }
    }
})