import React from 'react';
import {View} from 'react-native';
import GlobalStyles from './../Styles/global';
import Button from './../Components/Button';
import {Actions} from 'react-native-redux-router';

const AddFeedButton = () => (
    <View style={GlobalStyles.wrapper}>
        <View style={GlobalStyles.center}>
            <Button containerStyle={GlobalStyles.emptyMessage} onPress={Actions.add}>
                Add RSS feed
            </Button>
        </View>
    </View>
);

module.exports = AddFeedButton;
