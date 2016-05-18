import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import TextInput from './../Components/TextInput';
import Button from './../Components/Button';
import {updateRssFeeds, resetAddForm, getRssItem} from './../Redux/Actions/RssActions';
import {displayNotification, hideNotification} from './../Redux/Actions/NoticifationAction';
import {Actions} from 'react-native-redux-router';
import {Colors} from './../Styles';
import Layout from './Layout';
let styles;

class AddRss extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            id: null,
            order: null
        };
    }

    componentWillUnmount() {
        this.props.resetAddForm();
    }

    render() {
        if (this.props.triggerSave) {
            this.props.updateRssFeeds(this.state);
            return null;
        }

        if (this.props.editItem && !this.state.id) {
            this.setState(this.props.editItem[0]);
            return null;
        }

        if (this.props.rssId && !this.state.id) {
            this.props.getRssItem(this.props.rssId);
            return null;
        }

        if (this.props.errorMessage) {
            this.props.displayNotification({
                type: 'warning',
                message: this.props.errorMessage
            });
        } else if (this.props.success) {
            this.props.hideNotification();
            this.props.resetAddForm();
            Actions.settings();
        }

        return (
            <Layout>
                <View style={styles.inputContainer}>
                    <TextInput
                        name="rss"
                        label="Rss feed url"
                        value={this.state.url}
                        placeholder="http://sample-rss.com"
                        onChangeText={(value) => this.setState.bind(this)({url: value})}
                        autoCapitalize="none"
                    />
                {this.state.id ?
                    <Button style={styles.deleteButton}>Delete Feed</Button>
                    : null}
                </View>
            </Layout>
        );
    }
}

AddRss.propTypes = {
    url: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    success: React.PropTypes.bool,
    triggerSave: React.PropTypes.bool,
    updateRssFeeds: React.PropTypes.func,
    displayNotification: React.PropTypes.func,
    hideNotification: React.PropTypes.func,
    resetAddForm: React.PropTypes.func,
    getRssItem: React.PropTypes.func,
    editItem: React.PropTypes.object,
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
    hideNotification
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRss);
