import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { CustomEventCatalog } from "../../../mapping";

import { ICustomEventCatalog } from "../../../models";
import * as actions from "../../actions/catalogActions/customEventCatalogActions"
import * as common from "../../actions/commonActions"

export type CustomEventCatalogActions = ActionType<typeof common & typeof actions>;

export interface ICustomEventCatalogState{
    customEventCatalog : ICustomEventCatalog
}

const initial : ICustomEventCatalogState = {
    customEventCatalog : CustomEventCatalog.Create()
}

export default combineReducers<ICustomEventCatalogState, CustomEventCatalogActions>({
    customEventCatalog: (state = initial.customEventCatalog, action) => {
        switch (action.type) {
            case getType(actions.openCustomEventCatalog):
                return {
                    ...state,
                    Refresh: true
                }
            case getType(actions.closeCustomEventCatalog):
                return initial.customEventCatalog
            // case getType(actions.setCustomEventFilter):
            //     return {
            //         ...state,
            //         Filter: action.payload.filter,
            //         Refresh: action.payload.refresh
            //     }
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
            // case getType(actions.fetchCustomEventCatalogNextLink.success):
            //     return {
            //         ...state,
            //         Values: MapHelper.Create(state.Values)
            //             .AddMap(action.payload.Values)
            //             .GetMap(),
            //         OData: action.payload.OData
            //     }
            // case getType(actions.addSetListToCatalog.success):
            //     return {
            //         ...state,
            //         Values: MapHelper.Create(state.Values)
            //             .AddAsFirst(action.payload.Id, action.payload)
            //             .GetMap()
            //     }
            default:
                return state;
        }
    }
})