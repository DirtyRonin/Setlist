
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/catalogActions/songCatalogActions"

import { ISongCatalog } from "../../../models";
import { SongCatalog } from "../../../mapping";

import { MapHelper } from "../../../utils"

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
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addSongToCatalog.success):
                {
                    const { Values } = state
                    Values.unshift(action.payload)

                    return {
                        ...state,
                        Values
                    }
                }
            case getType(actions.editSongInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload.id)
                    Values[index] = action.payload

                    return {
                        ...state, Values
                    }
                }
            case getType(actions.deleteSongInCatalog.success):
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

