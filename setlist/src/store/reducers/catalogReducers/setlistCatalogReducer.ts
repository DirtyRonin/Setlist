import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import { SetlistCatalog, SetlistSong } from "mapping";
import { ISetlistCatalog } from "models";
import { MapHelper } from "utils";

import * as actions from "store/actions/catalogActions/setlistCatalogActions"
import { ILogoutAction, LOGOUT } from "store/auth/types";

export type SetlistCatalogActions = ActionType<typeof actions>;

export interface ISetlistCatalogState {
    setlistCatalog: ISetlistCatalog
}

const initial: ISetlistCatalogState = {
    setlistCatalog: SetlistCatalog.Create()
}

export default combineReducers<ISetlistCatalogState, SetlistCatalogActions | ILogoutAction>({
    setlistCatalog: (state = initial.setlistCatalog, action) => {
        switch (action.type) {
            case getType(actions.setSetlistFilter):
                return {
                    ...state,
                    Filter: action.payload.filter,
                    Refresh: action.payload.refresh
                }
            case getType(actions.fetchSetlistCatalog.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchSetlistCatalog.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.request):
                return {
                    ...state,
                    Refresh: false
                }
            case getType(actions.fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.success):
                return {
                    ...state,
                    Values: action.payload.Values,
                    Meta: action.payload.Meta
                }
            case getType(actions.fetchSetlistCatalogNextLink.success):
                return {
                    ...state,
                    Values: state.Values.concat(action.payload.Values),
                    Meta: action.payload.Meta
                }
            case getType(actions.addSetlistToCatalog.success):
                {
                    const { Values } = state
                    Values.unshift(action.payload)

                    return {
                        ...state,
                        Values
                    }
                }
            case getType(actions.editSetlistInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload.id)
                    Values[index] = action.payload

                    return {
                        ...state, Values
                    }
                }
            case getType(actions.deleteSetlistInCatalog.success):
                {
                    const { Values } = state

                    const index = Values.findIndex(x => x.id === action.payload)
                    Values.splice(index, 1)

                    return {
                        ...state,
                        Values
                    }
                }
            case LOGOUT: {
                return initial.setlistCatalog
            }
            default:
                return state;
        }
    }
})