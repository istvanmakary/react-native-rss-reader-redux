import {combineReducers} from 'redux';
import routerReducer from './RouterReducer';
import rssReducer from './RssReducer';
import notificationReducer from './NotificationReducer';

let rootReducer = combineReducers({
    routerReducer,
    rssReducer,
    notificationReducer
});

module.exports = rootReducer;
