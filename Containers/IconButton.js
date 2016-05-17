import React from 'React';
import {View} from 'react-native';
import Button from './../Components/Button';
import Icon from './../Components/Icon';

let btn = (props) => {
    let buttonContent = [
        (props.src ? (
            <View style={props.iconStyle}>
                <Icon src={props.src} size={props.size} color={props.color} />
            </View>
        ) : <View style={props.iconStyle} />),
        (props.onlyIcon ? null : props.children)
    ];

    if (props.reverse) {
        buttonContent = buttonContent.reverse();
    }

    return (
        <Button
            style={props.buttonStyle}
            containerStyle={props.containerStyle}
            styleDisabled={props.styleDisabled}
            onPress={props.onPress}
        >
            {buttonContent}
        </Button>
    );
};

btn.propTypes = {
    text: React.PropTypes.string.isRequired,
    buttonStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    containerStyle: React.PropTypes.object,
    onPress: React.PropTypes.func,
    styleDisabled: React.PropTypes.object,
    src: React.PropTypes.string,
    size: React.PropTypes.number,
    color: React.PropTypes.string,
    onlyIcon: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]),
    reverse: React.PropTypes.bool
};

module.exports = btn;
