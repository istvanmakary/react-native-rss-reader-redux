let navBar = require('./../Containers/NavBar');
let RssList = require('./../Containers/RssList');
let AddRss = require('./../Containers/AddRss');
let Settings = require('./../Containers/Settings');
let {Actions} = require('react-native-redux-router');

const navigate = (target) => () => Actions[target === 'back' ? 'pop' : target]();

const ROUTES = {
    navBar,
    initial: 'home',
    routes: [
        {
            name: 'home',
            component: RssList,
            title: 'Reader',
            rightButton: {
                onPress: navigate('settings'),
                label: 'Settings',
                icon: 'angle-right'
            }
        },
        {
            name: 'settings',
            component: Settings,
            title: 'Feeds',
            leftButton: {
                onPress: navigate('back'),
                label: 'Back',
                icon: 'angle-left'
            },
            rightButton: {
                onPress: navigate('add'),
                label: 'Add new',
                icon: 'plus'
            }
        },
        {
            name: 'add',
            component: AddRss,
            title: 'Add Rss',
            leftButton: {
                onPress: navigate('back'),
                label: 'Back',
                icon: 'angle-left'
            }
        }
    ]
};

module.exports = ROUTES;
