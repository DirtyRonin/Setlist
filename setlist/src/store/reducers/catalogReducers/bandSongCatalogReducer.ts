
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { BandSongCatalog } from "../../../mapping";
import { IBandSongCatalog } from "../../../models";
import { MapHelper } from "../../../Util";

import * as actions from "../../actions/catalogActions/bandSongCatalogActions"

export type BandSongCatalogActions = ActionType<typeof actions>;

export interface IBandSongCatalogState {
    bandSongCatalog: IBandSongCatalog;
}

const initial: IBandSongCatalogState = {
    bandSongCatalog: BandSongCatalog.Create("")
}

export default combineReducers<IBandSongCatalogState, BandSongCatalogActions>({
    bandSongCatalog: (state = initial.bandSongCatalog, action) => {
        switch (action.type) {
            case getType(actions.openBandSongsCatalog):
                return { ...state, 
                    Refresh: true,
                    BandId: action.payload 
                }
            case getType(actions.closeBandSongsCatalog):
                return initial.bandSongCatalog
                case getType(actions.setBandSongFilter):
                    return {
                        ...state,
                        Filter: action.payload.filter,
                        Refresh:action.payload.refresh
                    }

            case getType(actions.fetchBandSongCatalog.request):
                return { ...state, Refresh: false }
            case getType(actions.fetchBandSongCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchBandSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            default:
                return state;
        }

    }
})