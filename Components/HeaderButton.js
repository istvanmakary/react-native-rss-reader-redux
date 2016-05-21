import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from './IconButton';
import {Colors} from './../Styles';
let styles;

let HeaderButton = (props) => (
    props.item ? (
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
    ) : <View style={styles.headerSideBar} />
);

HeaderButton.propTypes = {
    item: React.PropTypes.object,
    containerStyle: View.propTypes.style,
    reverseOrder: React.PropTypes.bool,
    label: React.PropTypes.string
};

styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 5,
        paddingRight: 5
    }
});

module.exports = HeaderButton;
