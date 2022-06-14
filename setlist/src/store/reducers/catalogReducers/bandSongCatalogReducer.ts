
import { combineReducers } from "redux";
import { ILogoutAction, LOGOUT } from "store/auth/types";
import { ActionType, getType } from "typesafe-actions";
import { BandSongCatalog } from "../../../mapping";
import { IBandSongCatalog,IBandSong } from "../../../models";

import * as actions from "../../actions/catalogActions/bandSongCatalogActions"

export type BandSongCatalogActions = ActionType<typeof actions>;

export interface IBandSongCatalogState {
    bandSongCatalog: IBandSongCatalog;
}

const initial: IBandSongCatalogState = {
    bandSongCatalog: BandSongCatalog.Create(0)
}

export default combineReducers<IBandSongCatalogState, BandSongCatalogActions| ILogoutAction>({
    bandSongCatalog: (state = initial.bandSongCatalog, action) => {
        switch (action.type) {
            case getType(actions.setBandIdForBandSong):
                return {
                    ...state,
                    Refresh: true,
                    bandId: action.payload
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
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchBandSongCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addBandSongToCatalog.success):{
                const {Values} = state
                Values.unshift(action.payload)

                return {
                    ...state,
                    Values
                }
            }
            case getType(actions.editBandSongInCatalog.success):{

                const {Values} = state

                const index = Values.findIndex(x => x.songId === action.payload.songId)
                Values[index] = action.payload

                return {
                    ...state,Values
                    
                }}
            case getType(actions.deleteBandSongInCatalog.success): {

                const {Values} = state

                const index = Values.findIndex(x => x.songId === action.payload)
                Values.splice(index,1)

                return {
                    ...state,
                    Values
                }
            }
            case LOGOUT: {
                return initial.bandSongCatalog
            }

            default:
                return state;
        }

    }
})

// function IsBandSong(payload: IBandSong): (value: IBandSong, index: number, obj: IBandSong[]) => unknown {
//     return x => x.bandId === payload.bandId && x.songId === payload.songId;
// }

