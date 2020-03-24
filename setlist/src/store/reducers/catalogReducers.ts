
import { combineReducers } from "redux";
import { ActionType, getType, action } from "typesafe-actions";
import { HashTable } from "../../Util";
import { ISongCatalog, IBandSummary } from "../../models";

import * as actions from "../actions/";
import { IAppState, ICatalogState } from "../containers";

export type AppActions = ActionType<typeof actions>;

export const defaultAppState: IAppState = {
    catalogState: { songListOrder: [] as string[], songLists: {} as HashTable<ISongCatalog> } as ICatalogState
    // availableBandlists : {} as HashTable<IBandSummary>
}

export default combineReducers<IAppState, AppActions>({
    catalogState: (state = defaultAppState.catalogState, action) => {
        switch (action.type) {
            case getType(actions.fetchSongCatalogsAsync.success):
                return { songLists: action.payload.songLists, songListOrder: action.payload.songListOrder }
            case getType(actions.AddSongAsync.success):
                return {...state, }
            default:
                return state;
        }
    }
})