import {applyMiddleware, createStore} from 'redux';
import rootReducer from './../Reducers';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import * as storage from 'redux-storage';
import createEngine from './../../lib/react-native-storage-engine';
const engine = createEngine('rssreader');
const storageMiddleware = storage.createMiddleware(engine);
const logger = createLogger();
const load = storage.createLoader(engine);

let store = createStore(
  rootReducer,
  applyMiddleware(logger, ReduxThunk, storageMiddleware)
);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

module.exports = store;
