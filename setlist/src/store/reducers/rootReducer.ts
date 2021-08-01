import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import bandSongCatalogReducers from "./catalogReducers/bandSongCatalogReducer"
import setlistCatalogReducers from "./catalogReducers/setlistCatalogReducer"
import setlistSongCatalogReducers from "./catalogReducers/setlistSongCatalogReducer"
import userReducers from "./userReducer"
import dropDownFilterReducer from "./layoutReducers/GlobalBandFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics, userEpics, setlistCatalogEpics,setlistSongCatalogEpics } from "../epics"
import { commonCatalogEpics } from '../epics/commonEpics';

export const rootEpic = combineEpics(
  songCatalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics,
  setlistCatalogEpics,
  setlistSongCatalogEpics,
  commonCatalogEpics,
  userEpics
)

export const rootReducer = combineReducers({
  catalogReducers,
  bandCatalogReducers,
  songCatalogReducers,
  bandSongCatalogReducers,
  setlistCatalogReducers,
  setlistSongCatalogReducers,
  dropDownFilterReducer,
  userReducers
});

export type RootState = StateType<typeof rootReducer>;