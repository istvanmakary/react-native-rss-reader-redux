import React from 'react';
import {ListView, Text, View, Linking, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import AddFeedButton from './AddFeedButton';
import NotificationContainer from './NotificationContainer';
let styles;

class RssList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ds: new ListView.DataSource({
                getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
                getRowData: (dataBlob, sectionID, rowID) => dataBlob[`${sectionID}:${rowID}`],
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            rss: [],
            sectionIds: [],
            rowIds: []
        };
    }

    componentWillReceiveProps(nextProps) {
        let rss = {};
        let sectionIds = [];
        let rowIds = [];
        let counter = 0;

        nextProps.loadedFeeds.map((current) => {
            rss[current.header.id] = current.header.title;
            sectionIds.push(current.header.id);
            rowIds[counter] = [];

            current.sections.map((c) => {
                rss[`${current.header.id}:${c.id}`] = c;
                rowIds[counter].push(c.id);
            });

            counter++;
        });

        this.setState({
            rss,
            sectionIds,
            rowIds
        });
    }

    openUrl(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Don't know how to open URI: ${url}`);
            }
        });
    }

    renderRssRowHeader(row) {
        return (
            <View style={styles.feedItemTitle}>
                <Text style={styles.feedItemTitleText}>{row}</Text>
            </View>
        );
    }

    renderRssRowContent(row) {
        return (
            <View>
                <TouchableHighlight onPress={() => this.openUrl(row.link)}>
                    <View style={styles.feedItemArticle}>
                        <Text style={styles.feedItemArticleTitle}>{row.title}</Text>
                        <Text style={styles.feedItemArticleDescription}>{row.description}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        let dataSource;
        let result = <AddFeedButton />;

        if (this.props.loadedFeeds.length) {
            dataSource = this.state.ds.cloneWithRowsAndSections(
                this.state.rss, this.state.sectionIds, this.state.rowIds);

            result = (
                <NotificationContainer scrollEnabled={!this.props.loadedFeeds.length}>
                    <View style={styles.container}>
                        <ListView
                            style={styles.listView}
                            dataSource={dataSource}
                            renderRow={(row) => this.renderRssRowContent.bind(this)(row)}
                            renderSectionHeader={(row) => this.renderRssRowHeader.bind(this)(row)}
                        />
                    </View>
                </NotificationContainer>
            );
        }

        return result;
    }
}

RssList.propTypes = {
    loadedFeeds: React.PropTypes.array,
    fetching: React.PropTypes.bool
};

styles = StyleSheet.create({
    listView: {
        marginTop: -8,
        marginLeft: -10,
        marginRight: -10
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    feedItemTitle: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f4f5',
        backgroundColor: '#fff'
    },
    feedItemTitleText: {
        fontWeight: 'bold',
        color: '#0059a7'
    },
    feedItemArticle: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f4f5',
        backgroundColor: '#fbfbfb'
    },
    feedItemArticleTitle: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    feedItemArticleDescription: {
        color: '#333'
    }
});

function mapStateToProps(state) {
    let {fetching, loadedFeeds} = state.rssReducer;

    return {
        fetching,
        loadedFeeds
    };
}

let mapDispatchToProps = {};

module.exports = connect(mapStateToProps, mapDispatchToProps)(RssList);
