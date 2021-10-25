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
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchBandCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addBandToCatalog.success):
                {
                    const { Values } = state
                    Values.unshift(action.payload)

                    return {
                        ...state,
                        Values
                    }
                }

            case getType(actions.editBandInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload.id)
                    Values[index] = action.payload

                    return {
                        ...state, Values
                    }
                }
            case getType(actions.deleteBandInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload)
                    Values.splice(index, 1)

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