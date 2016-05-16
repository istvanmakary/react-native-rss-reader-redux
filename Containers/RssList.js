let React = require('react');
let {View, ListView} = require('react-native');
let GlobalStyles = require('./../Styles/global');

const RssList = (props) => {
    let dataSources = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    dataSources = dataSources.cloneWithRows(['row 1', 'row 2']);

    return (
        <View style={GlobalStyles.wrapper}>
            <ListView
                dataSource={props.feeds}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
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
