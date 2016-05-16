let React = require('react');
let {View, Text} = require('react-native');
let Button = require('./../Components/Button');
let GlobalStyles = require('./../Styles/global');

const Settings = () => (
    <View style={GlobalStyles.wrapper}>
        <Text>Settings</Text>
    </View>
);

module.exports = Settings;
