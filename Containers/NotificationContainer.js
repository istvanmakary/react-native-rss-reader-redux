import React from 'react';
import {GlobalStyle} from './../Styles';
import {View, StyleSheet, ScrollView} from 'react-native';
import Notification from './Notification';
let styles;

const NotificationContainer = ({children, style, scrollEnabled}) => (
    <View style={styles.container}>
        <Notification />
        {scrollEnabled ? (
            <ScrollView style={[GlobalStyle.wrapper, style]}>
                {children}
            </ScrollView>
        ) : <View style={[GlobalStyle.wrapper, style]}>
            {children}
        </View>}
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
    scrollEnabled: React.PropTypes.bool
};

module.exports = NotificationContainer;
