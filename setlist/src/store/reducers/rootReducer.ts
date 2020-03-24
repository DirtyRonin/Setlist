import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { StateType } from "typesafe-actions";

import appReducers from "./catalogReducers"
import { catalogEpics } from "../epics"

export const rootEpic = combineEpics(
  catalogEpics
)

export const rootReducer = combineReducers({
  appReducers
});

export type RootState = StateType<typeof rootReducer>;
