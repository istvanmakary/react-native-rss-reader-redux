let {combineReducers} = require('redux');
let routerReducer = require('./RouterReducer');
let rssReducer = require('./RssReducer');
let notificationReducer = require('./NotificationReducer');

let rootReducer = combineReducers({
    routerReducer,
    rssReducer,
    notificationReducer
});

module.exports = rootReducer;
