import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import dropDownFilterReducer from "./layoutReducers/GlobalBandFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics } from "../epics"
import { commonCatalogEpics } from '../epics/commonEpics';

export const rootEpic = combineEpics(
  songCatalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics,
  commonCatalogEpics
)

export const rootReducer = combineReducers({
  catalogReducers,
  bandCatalogReducers,
  songCatalogReducers,
  dropDownFilterReducer
});

export type RootState = StateType<typeof rootReducer>;