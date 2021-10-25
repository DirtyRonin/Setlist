import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { MapHelper } from "utils";
import { SetlistSongCatalog } from "../../../mapping/SongCatalog/setlistSongCatalog";
import { ISetlistSongCatalog } from "../../../models";

import * as actions from "../../actions/catalogActions/setlistSongCatalogActions"
import * as common from "../../actions/commonActions"

export type SetlistSongCatalogActions = ActionType<typeof common & typeof actions>;

export interface ISetlistSongCatalogState {
    setlistSongCatalog: ISetlistSongCatalog
}

const initial: ISetlistSongCatalogState = {
    setlistSongCatalog: SetlistSongCatalog.Create(0)
}

export default combineReducers<ISetlistSongCatalogState, SetlistSongCatalogActions>({
    setlistSongCatalog: (state = initial.setlistSongCatalog, action) => {
        switch (action.type) {
            case getType(actions.setSetlistIdForSetlistSong):
                return {
                    ...state,
                    Refresh: true,
                    SetlistId: action.payload
                }
            case getType(actions.setSetlistSongFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }
            case getType(actions.fetchSetlistSongCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchSetlistSongCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchSetlistSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addSetlistSongToCatalog.success):
                const { Values } = state
                Values.unshift(action.payload)

                return {
                    ...state,
                    Values
                }
            case getType(actions.editSetlistSongInCatalog.success):
                {

                    const { Values } = state

                    const index = Values.findIndex(x => x.songId === action.payload.songId)
                    Values[index] = action.payload

                    return {
                        ...state, Values

                    }
                }
            case getType(actions.deleteSetlistSongInCatalog.success): {

                const { Values } = state

                const index = Values.findIndex(x => x.songId === action.payload)
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
