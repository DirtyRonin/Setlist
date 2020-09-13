import { createStore, applyMiddleware } from 'redux';
import {createLogger}  from 'redux-logger';
import {  rootReducer, rootEpic, CatalogActions } from '.';
import { createEpicMiddleware } from 'redux-observable';
import { RootState } from './reducers';

export function storeSetup(initialState?: RootState) {
  const loggerMiddleware = createLogger();
  const epicMiddleware = createEpicMiddleware<CatalogActions>();

  const middlewares = [
    loggerMiddleware,
    epicMiddleware
  ];

  const configureStore = createStore(rootReducer,initialState,applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic)

  return configureStore;
}