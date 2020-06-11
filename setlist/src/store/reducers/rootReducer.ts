import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import catalogReducers from "./catalogReducers"
import { catalogEpics, bandCatalogEpics } from "../epics"

export const rootEpic = combineEpics(
  catalogEpics,
  bandCatalogEpics
)

export const rootReducer = combineReducers({
  catalogReducers
});

export type RootState = StateType<typeof rootReducer>;
