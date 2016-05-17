import React from 'react';
import {Provider} from 'react-redux';
import store from './../Redux/Store';
import AppRouter from './AppRouter';

const App = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

module.exports = App;
