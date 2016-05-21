import {applyMiddleware, createStore} from 'redux';
import rootReducer from './../Reducers';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();

module.exports = createStore(
  rootReducer,
  applyMiddleware(logger, ReduxThunk)
);
