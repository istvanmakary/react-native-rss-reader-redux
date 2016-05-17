import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import TextInput from './../Components/TextInput';
import {addRss, hideError} from './../Redux/Actions/RssActions';
import {displayNotification, hideNotification} from './../Redux/Actions/NoticifationAction';
import {Actions} from 'react-native-redux-router';
import Layout from './Layout';
let styles;

class AddRss extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };
    }

    componentWillUnmount() {
        this.props.hideError();
    }

    render() {
        this.props.hideNotification();

        if (this.props.triggerSave) {
            this.props.addRss(this.state.url);
            return null;
        }

        if (this.props.errorMessage) {
            this.props.displayNotification({
                type: 'warning',
                message: this.props.errorMessage
            });
        } else if (this.props.success) {
            Actions.settings();
        }

        return (
            <Layout>
                <View style={styles.inputContainer}>
                    <TextInput
                        name="rss"
                        label="Rss feed url"
                        value={this.props.url}
                        placeholder="http://sample-rss.com"
                        onChangeText={(value) => this.setState.bind(this)({url: value})}
                        autoCapitalize="none"
                    />
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
    addRss: React.PropTypes.func,
    displayNotification: React.PropTypes.func,
    hideNotification: React.PropTypes.func,
    hideError: React.PropTypes.func
};

styles = StyleSheet.create({
    text: {
        marginBottom: 20
    },
    inputContainer: {
        marginBottom: 20
    }
});

function mapStateToProps(state) {
    let {triggerSave, errorMessage, success} = state.rssReducer;

    return {
        errorMessage,
        success,
        triggerSave
    };
}

let mapDispatchToProps = {
    addRss,
    hideError,
    displayNotification,
    hideNotification
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRss);
