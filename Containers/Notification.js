let React = require('react');
let {connect} = require('react-redux');
let {View, Text, StyleSheet} = require('react-native');
let {hideNotification} = require('./../Redux/Actions/NoticifationAction');
let styles;
let activeRoute;

let Notification = (props) => {
    if (props.currentRoute !== activeRoute) {
        props.hideNotification();
    }

    activeRoute = props.currentRoute;

    return (
        props.notification ? (
            <View style={styles.container}>
                <Text style={styles.text}>{props.notification}</Text>
            </View>
        ) : <View />
    );
};

Notification.propTypes = {
    notification: React.PropTypes.string,
    currentRoute: React.PropTypes.string,
    hideNotification: React.PropTypes.func
};

styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'red'
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    let {notification} = state.notificationReducer;
    let {currentRoute} = state.routerReducer;

    return {
        notification,
        currentRoute
    };
}

let mapDispatchToProps = {
    hideNotification
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Notification);
