import React from 'react';
import {GlobalStyle} from './../Styles';
import {View, StyleSheet, ScrollView} from 'react-native';
import Notification from './Notification';
let styles;

const NotificationContainer = ({children, style, disableScroll}) => (
    <View style={styles.container}>
        <Notification />
        {disableScroll === true ? (<View style={[GlobalStyle.wrapper, style]} children={children} />) : (<ScrollView style={[GlobalStyle.wrapper, style]} children={children} />)}
    </View>
);

styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

NotificationContainer.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.string
    ]),
    style: View.propTypes.style,
    disableScroll: React.PropTypes.bool
};

module.exports = NotificationContainer;
