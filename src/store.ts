
import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from 'ducks';
import rootEpic from 'epics';
import {createLogger} from 'redux-logger';

export default (initialState = {}) => {
  const logger = createLogger();
  const epic = createEpicMiddleware();
  const middleware = applyMiddleware(epic, logger);

  const store = createStore(rootReducer, initialState, middleware);

  epic.run(rootEpic);

  return store;
};