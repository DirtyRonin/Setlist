import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";
import { connectRouter } from 'connected-react-router';
import { History } from 'history'

import catalogReducers from "./catalogReducers"
import userReducers from "./userReducer"
import bandCatalogReducers from "./catalogReducers/bandCatalogReducer"
import songCatalogReducers from "./catalogReducers/songCatalogReducer"
import bandSongCatalogReducers from "./catalogReducers/bandSongCatalogReducer"
import setlistCatalogReducers from "./catalogReducers/setlistCatalogReducer"
import setlistSongCatalogReducers from "./catalogReducers/setlistSongCatalogReducer"
import locationCatalogReducers from "./catalogReducers/locationCatalogReducer"
import customEventCatalogReducers from "./catalogReducers/customEventCatalogReducer"
import modalReducers from "store/reducers/modalReducers"

import dropDownFilterReducer from "./layoutReducers/GlobalBandFilterReducers"
import { songCatalogEpics, bandCatalogEpics, bandSongCatalogEpics, userEpics, setlistCatalogEpics, setlistSongCatalogEpics, locationCatalogEpics, customEventCatalogEpics } from "store/epics"

import { auth } from "../auth/reducers"

export const rootEpic = combineEpics(
  bandCatalogEpics,
  songCatalogEpics,
  bandSongCatalogEpics,
  setlistCatalogEpics,
  setlistSongCatalogEpics,
  locationCatalogEpics,
  customEventCatalogEpics,

  userEpics
)

const reducers = {
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
  userReducers,
  modalReducers
}

export type RootState = StateType<typeof reducers>;

export const rootReducer = (history: History) => combineReducers({
  ...reducers,
  router: connectRouter(history)
})
