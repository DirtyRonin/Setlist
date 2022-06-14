import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { cloneDeep } from "lodash";
import { SetlistSongCatalog } from "../../../mapping/SongCatalog/setlistSongCatalog";
import { ISetlistSong, ISetlistSongCatalog } from "../../../models";

import * as actions from "../../actions/catalogActions/setlistSongCatalogActions"
import * as common from "../../actions/commonActions"
import { ILogoutAction, LOGOUT } from "store/auth/types";

export type SetlistSongCatalogActions = ActionType<typeof common & typeof actions>;

export interface ISetlistSongCatalogState {
    setlistSongCatalog: ISetlistSongCatalog
}

const initial: ISetlistSongCatalogState = {
    setlistSongCatalog: SetlistSongCatalog.Create(0)
}

export default combineReducers<ISetlistSongCatalogState, SetlistSongCatalogActions | ILogoutAction>({
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

                let { totalCount } = state
                if (action.payload.Meta.Count > state.totalCount)
                    totalCount = action.payload.Meta.Count

                return {
                    ...state,
                    Values: action.payload.Values,
                    Meta: action.payload.Meta,
                    totalCount
                }

            case getType(actions.fetchSetlistSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addSetlistSongToCatalog.success):

                const Values = cloneDeep(state.Values)
                Values.unshift(action.payload)

                return {
                    ...state,
                    Values,
                    totalCount: state.totalCount++
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
            case getType(actions.deleteSetlistSongInCatalog.success):
                {
                    const Values = cloneDeep(state.Values)
                    const index = Values.findIndex(x => x.songId === action.payload)
                    Values.splice(index, 1)

                    return {
                        ...state,
                        Values,
                        totalCount: state.totalCount--
                    }
                }
            case getType(actions.swapSetlistSongInCatalog.success): {


                // // find indecies for the given payload
                // const oldIndices = action.payload.setlistSongs.map(
                //     _ => {
                //         const index = state.Values.findIndex(__ => __.id === _.id)
                //     })


                const oldIndices: number[] = action.payload.setlistSongs.reduce<number[]>((current, next) => {
                    const index = state.Values.findIndex(__ => __.id === next.id)
                    if (index !== -1)
                        current.push(index)

                    return current;
                }, [])



                //check if both state.Values contains both values from action.payload
                if (oldIndices.length === 2) {
                    const newValues = mirrorOrdersFromSetlistsongs(oldIndices, cloneDeep(state.Values));
                    return { ...state, Values: newValues }

                }
                else if (oldIndices.length === 1) {
                    const newValues = replaceSetlistsong(oldIndices[0], cloneDeep(state.Values), action.payload.setlistSongs);
                    return { ...state, Values: newValues }
                }
                else
                    return state
            }
            case LOGOUT: {
                return initial.setlistSongCatalog
            }

            default:
                return state;
        }
    }
})

function mirrorOrdersFromSetlistsongs(oldIndices: number[], currentValues: ISetlistSong[]): ISetlistSong[] {

    // reverse order of index
    const newIndices = [...oldIndices].reverse();

    // use hash as a temp ; easier filter through hash index
    // assign the new key Value pair
    const newHash = newIndices.reduce((hash, swapIndex, i) => {
        // reverse order of indices to swap the old key value pairs
        // swapping means recombing the pairs in reverse key/Value order
        hash[swapIndex] = currentValues[oldIndices[i]];

        // adjust the order property to match the new index
        hash[swapIndex].order = swapIndex + 1;

        return hash;
    }, {} as { [key: number]: ISetlistSong; });

    //swap the values in the new array
    newIndices.forEach(_ => currentValues[_] = newHash[_]
    );

    return currentValues;
}

function replaceSetlistsong(oldIndex: number, currentValues: ISetlistSong[], newSetlistSongs: ISetlistSong[]): ISetlistSong[] {
    const replace = currentValues[oldIndex]

    newSetlistSongs.forEach(_ => {
        if (replace.order === _.order)
            currentValues[oldIndex] = _
    })

    return currentValues

}

