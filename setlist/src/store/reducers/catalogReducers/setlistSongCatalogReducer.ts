import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { SetlistSongCatalog } from "../../../mapping/SongCatalog/setlistSongCatalog";
import { ISetlistSongCatalog } from "../../../models";

import * as actions from "../../actions/catalogActions/setlistSongCatalogActions"
import * as common from "../../actions/commonActions"

export type SetlistSongCatalogActions = ActionType<typeof common & typeof actions>;

export interface ISetlistSongCatalogState {
    setlistSongCatalog: ISetlistSongCatalog
}

const initial: ISetlistSongCatalogState = {
    setlistSongCatalog: SetlistSongCatalog.Create()
}

export default combineReducers<ISetlistSongCatalogState, SetlistSongCatalogActions>({
    setlistSongCatalog: (state = initial.setlistSongCatalog, action) => {
        switch (action.type) {
            case getType(actions.openSetlistSongCatalog):
                return {
                    ...state,
                    Refresh: true
                }
            case getType(actions.closeSetlistSongCatalog):
                return initial.setlistSongCatalog
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
                    OData: action.payload.OData
                }
            default:
                return state;
        }
    }
})
