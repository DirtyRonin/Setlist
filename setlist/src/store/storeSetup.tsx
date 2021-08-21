import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history';

import { rootReducer, rootEpic, CatalogActions } from '.';
import { RootState } from './reducers';


export function storeSetup(history: History,initialState?: RootState) {
  const loggerMiddleware = createLogger();
  const epicMiddleware = createEpicMiddleware<CatalogActions>();

  const middlewares = [
    loggerMiddleware,
    epicMiddleware,
    routerMiddleware(history)
  ];

  const configureStore = createStore(
    rootReducer(history),
    initialState,
    applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic)

  return configureStore;
}