import { Store, createStore, compose, applyMiddleware } from 'redux';
import {createLogger}  from 'redux-logger';
import {  rootReducer, rootEpic, CatalogActions } from '.';
import { createEpicMiddleware } from 'redux-observable';
import { RootState } from './reducers';

export function storeSetup(initialState?: RootState) {
  const loggerMiddleware = createLogger();
  const epicMiddleware = createEpicMiddleware<CatalogActions>();

  const middlewares = [
    // add additional middleware like redux-thunk here
    loggerMiddleware,
    epicMiddleware
  ];

  const configureStore = createStore(rootReducer,initialState,applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic)

  return configureStore;
}