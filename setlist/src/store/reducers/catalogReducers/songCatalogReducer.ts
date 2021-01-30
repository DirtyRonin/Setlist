
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/catalogActions/songCatalogActions"

import { ISongCatalog } from "../../../models";
import { SongCatalog } from "../../../mapping";

import { MapHelper } from "../../../Util"

export type SongCatalogActions = ActionType<typeof actions>;

export interface ISongCatalogState {
    songCatalog: ISongCatalog;
}

const initial: ISongCatalogState = {
    songCatalog: SongCatalog.Create()
}

export default combineReducers<ISongCatalogState, SongCatalogActions>({
    songCatalog: (state = initial.songCatalog, action) => {
        switch (action.type) {
            case getType(actions.openThisSongCatalog):
                return {
                    ...state,
                    Refresh: true
                }
            case getType(actions.closeThisSongCatalog):
                return initial.songCatalog
            case getType(actions.setSongFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }

            case getType(actions.fetchSongCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchSongCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    OData: action.payload.OData
                }
            case getType(actions.fetchSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddMap(action.payload.Values)
                        .GetMap(),
                    OData: action.payload.OData
                }
            case getType(actions.addSongToCatalog.success):
                return {
                    ...state,
                    Values: MapHelper.Create(state.Values)
                        .AddAsFirst(action.payload.Id, action.payload)
                        .GetMap()
                }
            case getType(actions.editSongInCatalog.success):
                return {
                    ...state,
                    Values: state.Values.set(action.payload.Id, action.payload)
                }
            case getType(actions.deleteSongInCatalog.success): {
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

