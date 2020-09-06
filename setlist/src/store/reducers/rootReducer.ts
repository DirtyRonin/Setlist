import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import dropDownFilterReducer from "../subStores/subReducers/DropDownFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics } from "../epics"

export const rootEpic = combineEpics(
  songCatalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics
)

export const rootReducer = combineReducers({
  catalogReducers,
  bandCatalogReducers,
  songCatalogReducers,
  dropDownFilterReducer
});

export type RootState = StateType<typeof rootReducer>;