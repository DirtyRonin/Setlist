import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "store/actions/catalogActions/bandCatalogActions"
import * as common from "store/actions/commonActions"
import { IBandCatalog } from "models";
import { BandCatalog } from "mapping";
import { MapHelper } from "utils";

export type BandCatalogActions = ActionType<typeof common & typeof actions>;

export interface IBandCatalogState {
    bandCatalog: IBandCatalog;
}

const initial: IBandCatalogState = {
    bandCatalog: BandCatalog.Create()
}

export default combineReducers<IBandCatalogState, BandCatalogActions>({
    bandCatalog: (state = initial.bandCatalog, action) => {
        switch (action.type) {
            case getType(actions.setBandFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }

            case getType(actions.fetchBandCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchBandCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchBandCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            case getType(actions.addBandToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap()
                }
            case getType(actions.editBandInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteBandInCatalog.success): {
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