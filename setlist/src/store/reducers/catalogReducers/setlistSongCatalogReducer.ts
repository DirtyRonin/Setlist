import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { cloneDeep } from "lodash";
import { SetlistSongCatalog } from "../../../mapping/SongCatalog/setlistSongCatalog";
import { ISetlistSong, ISetlistSongCatalog } from "../../../models";

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

                const Values = cloneDeep(state.Values).unshift(action.payload)

                return {
                    ...state,
                    Values
                }
            case getType(actions.editSetlistSongInCatalog.success):
                {

                    const Values = cloneDeep(state.Values)

                    const index = Values.findIndex(x => x.songId === action.payload.songId)
                    Values[index] = action.payload

                    return {
                        ...state, Values
                    }
                }
            case getType(actions.swapSetlistSongInCatalog.success): {

                const Values = cloneDeep(state.Values)

                // find indecies for the given payload
                const oldIndices = action.payload.map(
                    _ => Values.findIndex(
                        __ => __.id === _
                    ))

                // reverse order of index
                const newIndices = [...oldIndices].reverse()

                // use hash as a temp ; easier filter through hash index
                // assign the new key Value pair
                const newHash = newIndices.reduce((hash, swapIndex, i) => {
                    // reverse order of indices to swap the old key value pairs
                    // swapping means recombing the pairs in reverse key/Value order
                    hash[swapIndex] = Values[oldIndices[i]]

                    // adjust the order property to match the new index
                    hash[swapIndex].order = swapIndex + 1

                    return hash
                }, {} as { [key: number]: ISetlistSong })

                //swap the values in the new array
                newIndices.forEach(_ =>
                    Values[_] = newHash[_]
                )

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
