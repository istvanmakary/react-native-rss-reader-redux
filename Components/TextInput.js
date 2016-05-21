import React from 'React';
import {View, Text, TextInput, StyleSheet} from 'react-native';
let styles;

let Input = ({label, name, value, onChangeText, placeholder, ...props}) => (
    <View key={name} style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            {...props}
            autoCorrect={false}
            multiline={false}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.inputField}
            value={value}
        />
    </View>
);

Input.propTypes = {
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onChangeText: React.PropTypes.func,
    placeholder: React.PropTypes.string
};

styles = StyleSheet.create({
    inputContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: -10,
        marginRight: -10
    },
    inputLabel: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputField: {
        alignSelf: 'stretch',
        height: 40
    }
});

module.exports = Input;
