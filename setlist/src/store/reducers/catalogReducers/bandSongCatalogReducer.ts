
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { BandSongCatalog } from "../../../mapping";
import { IBandSongCatalog } from "../../../models";
import { MapHelper } from "../../../utils";

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
            case getType(actions.setBandIdForBandSong):
                return {
                    ...state,
                    Refresh: true,
                    BandId: action.payload
                }
            case getType(actions.setBandSongFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
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
            case getType(actions.addBandSongToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap()
                }
            case getType(actions.editBandSongInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteBandSongInCatalog.success): {
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