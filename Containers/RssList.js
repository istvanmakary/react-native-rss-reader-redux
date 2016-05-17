import React from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import AddFeedButton from './AddFeedButton';
import Layout from './Layout';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const RssList = (props) => {
    let dataSource;

    if (props.feeds.length) {
        dataSource = ds.cloneWithRows(['row 1', 'row 2']);

        return (
            <Layout>
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />
            </Layout>
        );
    }

    return (
        <AddFeedButton />
    );
};

RssList.propTypes = {
    feeds: React.PropTypes.array
};

function mapStateToProps(state) {
    let {feeds} = state.rssReducer;

    return {
        feeds
    };
}

let mapDispatchToProps = {};

module.exports = connect(mapStateToProps, mapDispatchToProps)(RssList);
