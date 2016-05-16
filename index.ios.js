/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {AppRegistry} from 'react-native';
let App = require('./Containers/App');

if (__DEV__) {
    console.disableYellowBox = true;
}

AppRegistry.registerComponent('rssReaderRedux', () => App);
