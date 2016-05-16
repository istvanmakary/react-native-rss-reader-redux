let React = require('react');
let {Provider} = require('react-redux');
let store = require('./../Redux/Store');
let AppRouter = require('./AppRouter');

const App = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

module.exports = App;
