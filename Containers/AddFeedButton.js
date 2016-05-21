import React from 'react';
import {View} from 'react-native';
import {GlobalStyle} from './../Styles';
import Button from './../Components/Button';
import {Actions} from 'react-native-redux-router';

const AddFeedButton = () => (
    <View style={GlobalStyle.wrapper}>
        <View style={GlobalStyle.center}>
            <Button
                containerStyle={
                    [GlobalStyle.roundedButton, GlobalStyle.headerCorrection]
                }
                onPress={Actions.add}
            >
                Add RSS feed
            </Button>
        </View>
    </View>
);

module.exports = AddFeedButton;
