let React = require('react');
let {View, StyleSheet} = require('react-native');
let {connect} = require('react-redux');
let GlobalStyles = require('./../Styles/global');
let TextInput = require('./../Components/TextInput');
let Button = require('./../Components/Button');
let {addRss, typeRss} = require('./../Redux/Actions/RssActions');
let {displayNotification, hideNotification} = require('./../Redux/Actions/NoticifationAction');
let styles;

let AddRss = (props) => {
    let urlChange = (value) => {
        props.typeRss(value);
    };

    let submit = () => {
        props.addRss();
    };

    if (props.errorMessage) {
        props.displayNotification(props.errorMessage);
    } else {
        props.hideNotification();
    }

    return (
        <View style={GlobalStyles.wrapper}>
            <View style={styles.inputContainer}>
                <TextInput name="rss" label="Rss feed url" value={props.url} placeholder="http://sample-rss.com" onChangeText={(value) => urlChange.bind(this)(value)} />
            </View>
            <Button
                containerStyle={styles.buttonContainer}
                onPress={() => submit.bind(this)()}
            >
                Add new feed
            </Button>
        </View>
    );
};

AddRss.propTypes = {
    url: React.PropTypes.string.isRequired,
    errorMessage: React.PropTypes.string,
    addRss: React.PropTypes.func,
    typeRss: React.PropTypes.func,
    displayNotification: React.PropTypes.func,
    hideNotification: React.PropTypes.func
};

styles = StyleSheet.create({
    text: {
        marginBottom: 20
    },
    inputContainer: {
        marginBottom: 20
    },
    buttonContainer: {
        padding: 12,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fff'
    }
});

function mapStateToProps(state) {
    let {url, errorMessage} = state.rssReducer;

    return {
        url,
        errorMessage
    };
}

let mapDispatchToProps = {
    addRss,
    typeRss,
    displayNotification,
    hideNotification
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRss);
