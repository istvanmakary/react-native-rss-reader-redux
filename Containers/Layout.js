import React from 'react';
import GlobalStyles from './../Styles/global';
import {View, StyleSheet} from 'react-native';
import Notification from './Notification';
let styles;

const Layout = ({children}) => (
    <View style={styles.container}>
        <Notification />
        <View style={GlobalStyles.wrapper}>
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
