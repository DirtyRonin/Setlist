
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/catalogActions/songCatalogActions"
import * as common from "../../actions/commonActions"

import { ISongCatalog } from "../../../models";
import {  SongCatalog, FilterSongActionProps } from "../../../mapping";

export type SongCatalogActions = ActionType<typeof common & typeof actions>;

export interface ISongCatalogState {
    songCatalog: ISongCatalog;
}

const defaultActionProps = FilterSongActionProps.Default(SongCatalog.CatalogId)
const initial: ISongCatalogState ={
    songCatalog : SongCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" },{ ShowAddSong: false })
} 

export default combineReducers<ISongCatalogState, SongCatalogActions>({
    songCatalog: (state = initial.songCatalog, action) => {
        switch (action.type) {
            case getType(actions.openSongCatalog_New.success):
                return action.payload
            case getType(actions.fetchSongCatalog.success):
                return action.payload
            case getType(actions.fetchSongCatalogNextLink.success):
                return action.payload

            default:
                return state;
        }
    }
})