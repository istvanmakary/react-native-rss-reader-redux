import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import TextInput from './../Components/TextInput';
import Button from './../Components/Button';
import {updateRssFeeds, resetAddForm, getRssItem, deleteRssFeed} from './../Redux/Actions/RssActions';
import {displayNotification, hideNotification} from './../Redux/Actions/NoticifationAction';
import {Actions} from 'react-native-redux-router';
import {Colors, GlobalStyle} from './../Styles';
import NotificationContainer from './NotificationContainer';
let styles;

class AddRss extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            id: null,
            order: null,
            hasWarning: false
        };
    }

    componentDidMount() {
        if (this.props.rssId) {
            this.props.getRssItem(this.props.rssId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.triggerSave) {
            this.props.updateRssFeeds({
                url: this.state.url,
                id: this.state.id,
                order: this.state.order
            });
        }

        if (nextProps.editItem && !this.state.id && nextProps.editItem[0]) {
            this.setState(nextProps.editItem[0]);
        }

        if (nextProps.errorMessage && !this.state.hasWarning) {
            this.setState({
                hasWarning: true
            });
            this.props.displayNotification({
                type: 'warning',
                message: nextProps.errorMessage
            });
        } else if (nextProps.success) {
            Actions.pop();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldRender = false;

        Object.keys(this.state).map((item) => {
            if (nextState[item] !== this.state[item] && item !== 'hasWarning') {
                shouldRender = true;
            }
        });

        return shouldRender;
    }

    componentWillUnmount() {
        this.props.resetAddForm();
    }

    render() {
        return (
            <NotificationContainer>
                <View style={styles.inputContainer}>
                    <View style={styles.innerInputContainer}>
                        <TextInput
                            name="rss"
                            label="Rss feed url"
                            value={this.state.url}
                            placeholder="http://sample-rss.com"
                            onChangeText={(value) => this.setState.bind(this)({url: value})}
                            autoCapitalize="none"
                        />
                    </View>
                    {this.state.id ?
                        <View>
                            <Button
                                containerStyle={GlobalStyle.roundedButton}
                                style={styles.deleteButton}
                                onPress={() => this.props.deleteRssFeed({id: this.state.id})}
                            >Delete Feed</Button>
                        </View>
                    : null}
                </View>
            </NotificationContainer>
        );
    }
}

AddRss.propTypes = {
    url: React.PropTypes.string,
    errorMessage: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    editItem: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.bool
    ]),
    success: React.PropTypes.bool,
    triggerSave: React.PropTypes.bool,
    updateRssFeeds: React.PropTypes.func,
    displayNotification: React.PropTypes.func,
    hideNotification: React.PropTypes.func,
    resetAddForm: React.PropTypes.func,
    getRssItem: React.PropTypes.func,
    deleteRssFeed: React.PropTypes.func,
    rssId: React.PropTypes.string
};

styles = StyleSheet.create({
    text: {
        marginBottom: 20
    },
    inputContainer: {
        marginBottom: 20
    },
    deleteButton: {
        color: Colors.red
    },
    innerInputContainer: {
        paddingBottom: 20
    }
});

function mapStateToProps(state) {
    let {triggerSave, errorMessage, success, editItem} = state.rssReducer;

    return {
        errorMessage,
        success,
        triggerSave,
        editItem
    };
}

let mapDispatchToProps = {
    updateRssFeeds,
    resetAddForm,
    getRssItem,
    displayNotification,
    hideNotification,
    deleteRssFeed
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRss);
