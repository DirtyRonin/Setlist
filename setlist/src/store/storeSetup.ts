import { Store, createStore, compose, applyMiddleware } from 'redux';
import {createLogger}  from 'redux-logger';
import { RootState, rootReducer, rootEpic, AppActions } from '.';
import { createEpicMiddleware } from 'redux-observable';

export function storeSetup(initialState?: RootState) {
  const loggerMiddleware = createLogger();
  const epicMiddleware = createEpicMiddleware<AppActions>();

  const middlewares = [
    // add additional middleware like redux-thunk here
    loggerMiddleware,
    epicMiddleware
  ];

  const configureStore = createStore(rootReducer,initialState,applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic)

  return configureStore;
}