import React from 'react';
import {View, ListView, Text} from 'react-native';
import Icon from './../Components/Icon';
import {connect} from 'react-redux';
import AddFeedButton from './AddFeedButton';
import Layout from './Layout';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const renderRow = ({id, url}) => (
    <View key={id}>
        <Text>{url}</Text>
        <Icon src="trash" />
    </View>
);

const Settings = (props) => {
    let dataSource;

    if (props.feeds.length) {
        dataSource = ds.cloneWithRows(props.feeds);

        return (
            <Layout>
                <ListView
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
    feeds: React.PropTypes.array
};

function mapStateToProps(state) {
    let {feeds} = state.rssReducer;

    return {
        feeds
    };
}

let mapDispatchToProps = {};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Settings);
