import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconButton from './../Components/IconButton';
import {connect} from 'react-redux';
import AddFeedButton from './AddFeedButton';
import {Colors} from './../Styles';
import NotificationContainer from './NotificationContainer';
import {Actions} from 'react-native-redux-router';
let styles;

let editRow = (rssId) => {
    Actions.add({rssId});
};

const renderRow = ({id, url, status}) => (
    <View style={styles.row} key={id}>
        <View style={[styles.status, styles[`status_${status}`]]} />
        <Text numberOfLines={1} style={styles.url} numberOfLines={1}>{url}</Text>
        <IconButton
            onPress={() => editRow(id)}
            color={Colors.blue}
            src="pencil"
            size={18}
            onlyIcon
        />
    </View>
);

const Settings = (props) => {
    if (props.feeds.length) {
        let rows = props.feeds.map((item) => renderRow(item));

        return (
            <NotificationContainer style={styles.listView}>
                {rows}
            </NotificationContainer>
        );
    }

    return (
        <AddFeedButton />
    );
};

renderRow.propTypes = {
    id: React.PropTypes.string,
    url: React.PropTypes.string,
    status: React.PropTypes.string
};

Settings.propTypes = {
    feeds: React.PropTypes.array,
    editRss: React.PropTypes.func
};

styles = StyleSheet.create({
    listView: {
        marginLeft: -10,
        marginRight: -10
    },
    row: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 2,
        alignSelf: 'stretch',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center'
    },
    url: {
        flex: 1,
        alignSelf: 'stretch',
        fontWeight: 'bold',
        marginLeft: -8,
        marginRight: -30,
        paddingRight: 50,
        paddingLeft: 16,
        backgroundColor: 'transparent'
    },
    icon: {
        height: 10,
        marginLeft: 10
    },
    status: {
        width: 8,
        height: 8,
        borderRadius: 5
    },
    status_fetching: {
        backgroundColor: Colors.gray
    },
    status_success: {
        backgroundColor: Colors.blue
    },
    status_failed: {
        backgroundColor: Colors.red
    }
});

function mapStateToProps(state) {
    let {feeds} = state.rssReducer;

    return {
        feeds
    };
}

module.exports = connect(mapStateToProps)(Settings);
