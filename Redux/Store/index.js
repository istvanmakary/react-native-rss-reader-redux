let {createStore} = require('redux');
let rootReducer = require('./../Reducers');

module.exports = createStore(rootReducer);
