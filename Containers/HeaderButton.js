import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from './IconButton';
import {Colors} from './../Styles';
let styles;

let HeaderButton = (props) => {
    let result = <View style={styles.headerSideBar} />;

    if (props.item) {
        result = (
            <IconButton
                buttonStyle={styles.buttonStyle}
                iconStyle={styles.iconStyle}
                containerStyle={props.containerStyle}
                onPress={props.item.onPress}
                src={props.item.icon}
                size={20}
                color={Colors.blue}
                reverse={props.reverseOrder}
            >
                {props.item.label}
            </IconButton>
        );
    }

    return result;
};

HeaderButton.propTypes = {
    item: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
    reverseOrder: React.PropTypes.bool,
    label: React.PropTypes.string
};

styles = StyleSheet.create({
    buttonStyle: {
        fontSize: 16
    },
    iconStyle: {
        paddingLeft: 5,
        paddingRight: 5
    }
});

module.exports = HeaderButton;
