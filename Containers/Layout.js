import React from 'react';
import {GlobalStyle} from './../Styles';
import {View, StyleSheet} from 'react-native';
import Notification from './Notification';
let styles;

const Layout = ({children}) => (
    <View style={styles.container}>
        <Notification />
        <View style={GlobalStyle.wrapper}>
            {children}
        </View>
    </View>
);

styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

Layout.propTypes = {
    children: React.PropTypes.any
};

module.exports = Layout;
