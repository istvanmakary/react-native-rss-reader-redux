import React from 'react';
import {View, ListView, Text, StyleSheet} from 'react-native';
import IconButton from './IconButton';
import {connect} from 'react-redux';
import AddFeedButton from './AddFeedButton';
import {Colors} from './../Styles';
import Layout from './Layout';
import {Actions} from 'react-native-redux-router';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let styles;
let editRow = (rssId) => {
    Actions.add({rssId: rssId});
};

const renderRow = ({id, url}) => {
    return (
        <View style={styles.row} key={id}>
            <Text style={styles.url} numberOfLines={1}>{url}</Text>
            <IconButton
                onPress={() => editRow(id)}
                color={Colors.blue}
                src="pencil"
                size={18}
                onlyIcon
            />
        </View>
    );
};

const Settings = (props) => {
    let dataSource;

    if (props.feeds.length) {
        dataSource = ds.cloneWithRows(props.feeds);

        return (
            <Layout>
                <ListView
                    style={styles.listView}
                    dataSource={dataSource}
                    renderRow={renderRow}
                />
            </Layout>
        );
    }

    return (
        <AddFeedButton />
    );
};

renderRow.propTypes = {
    id: React.PropTypes.string,
    url: React.PropTypes.string
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
        flexDirection: 'row'
    },
    url: {
        marginRight: -30,
        paddingRight: 50,
        fontWeight: 'bold'
    },
    icon: {
        height: 10,
        marginLeft: 10
    }
});

function mapStateToProps(state) {
    let {feeds} = state.rssReducer;

    return {
        feeds
    };
}

let mapDispatchToProps = {};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Settings);
