import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import { catalogEpics, bandCatalogEpics, bandSongCatalogEpics } from "../epics"

export const rootEpic = combineEpics(
  catalogEpics,
  bandCatalogEpics,
  bandSongCatalogEpics
)

export const rootReducer = combineReducers({
  catalogReducers
});

export type RootState = StateType<typeof rootReducer>;
