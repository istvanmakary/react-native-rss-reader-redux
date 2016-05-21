let {StyleSheet} = require('react-native');

module.exports = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#EFEFF4'
    },
    center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerCorrection: {
        marginTop: -60
    },
    roundedButton: {
        padding: 12,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fff'
    }
});
