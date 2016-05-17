import navBar from './../Containers/NavBar';
import RssList from './../Containers/RssList';
import AddRss from './../Containers/AddRss';
import Settings from './../Containers/Settings';
import {Actions} from 'react-native-redux-router';
import {triggerSave} from './../Redux/Actions/RssActions';
import store from './../Redux/Store';
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
                label: 'Feeds',
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
            },
            rightButton: {
                onPress: () => store.dispatch(triggerSave()),
                label: 'Done'
            }
        }
    ]
};

module.exports = ROUTES;
