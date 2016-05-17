import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderButton from './HeaderButton';
let styles;

let NavBar = (props) => (
    <View>
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>{props.title}</Text>
            </View>
            <HeaderButton
                item={props.leftButton}
                containerStyle={[styles.headerSideBar, styles.headerSideBarLeft]}
            />
            <HeaderButton
                item={props.rightButton}
                containerStyle={[styles.headerSideBar, styles.headerSideBarRight]}
                reverseOrder
            />
        </View>
    </View>
);

NavBar.propTypes = {
    title: React.PropTypes.string,
    leftButton: React.PropTypes.object,
    rightButton: React.PropTypes.object
};

styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 28,
        paddingBottom: 15
    },
    headerTitle: {
        flex: 1,
        alignSelf: 'stretch'
    },
    headerTitleText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: -3
    },
    headerSideBar: {
        position: 'absolute'
    },
    headerSideBarRight: {
        right: 10
    },
    headerSideBarLeft: {
        left: 10
    }
});

module.exports = NavBar;
