import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import bandSongCatalogReducers from "./catalogReducers/bandSongCatalogReducer"
import setlistCatalogReducers from "./catalogReducers/setlistCatalogReducer"
import userReducers from "./userReducer"
import dropDownFilterReducer from "./layoutReducers/GlobalBandFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics, userEpics, setlistCatalogEpics } from "../epics"
import { commonCatalogEpics } from '../epics/commonEpics';

export const rootEpic = combineEpics(
  songCatalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics,
  setlistCatalogEpics,
  commonCatalogEpics,
  userEpics
)

export const rootReducer = combineReducers({
  catalogReducers,
  bandCatalogReducers,
  songCatalogReducers,
  bandSongCatalogReducers,
  setlistCatalogReducers,
  dropDownFilterReducer,
  userReducers
});

export type RootState = StateType<typeof rootReducer>;