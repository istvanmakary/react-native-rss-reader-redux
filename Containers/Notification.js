import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from './../Styles';
import {hideNotification} from './../Redux/Actions/NoticifationAction';
let styles;

let Notification = (props) => (
    props.notification ? (
        <View style={[styles.container, styles[props.notification.type]]}>
            <Text style={styles.text}>{props.notification.message}</Text>
        </View>
    ) : <View />
);

Notification.propTypes = {
    notification: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]),
    currentRoute: React.PropTypes.string,
    hideNotification: React.PropTypes.func
};

styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    warning: {
        backgroundColor: 'red'
    },
    success: {
        backgroundColor: 'green'
    }
});

function mapStateToProps(state) {
    let {notification} = state.notificationReducer;

    return {
        notification
    };
}

let mapDispatchToProps = {
    hideNotification
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Notification);
