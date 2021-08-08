import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import userReducers from "./userReducer"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import bandSongCatalogReducers from "./catalogReducers/bandSongCatalogReducer"
import setlistCatalogReducers from "./catalogReducers/setlistCatalogReducer"
import setlistSongCatalogReducers from "./catalogReducers/setlistSongCatalogReducer"
import locationCatalogReducers from "./catalogReducers/locationCatalogReducer"
import customEventCatalogReducers from "./catalogReducers/customEventCatalogReducer"

import dropDownFilterReducer from "./layoutReducers/GlobalBandFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics, userEpics, setlistCatalogEpics,setlistSongCatalogEpics, locationCatalogEpics,customEventCatalogEpics } from "../epics"
import { commonCatalogEpics } from '../epics/commonEpics';

import {auth} from "../auth/reducers"

export const rootEpic = combineEpics(
  songCatalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics,
  setlistCatalogEpics,
  setlistSongCatalogEpics,
  commonCatalogEpics,
  locationCatalogEpics,
  customEventCatalogEpics,
  
  userEpics
)

export const rootReducer = combineReducers({
  catalogReducers,
  bandCatalogReducers,
  songCatalogReducers,
  bandSongCatalogReducers,
  setlistCatalogReducers,
  setlistSongCatalogReducers,
  locationCatalogReducers,
  customEventCatalogReducers,
  dropDownFilterReducer,
  auth,

  userReducers
});

export type RootState = StateType<typeof rootReducer>;