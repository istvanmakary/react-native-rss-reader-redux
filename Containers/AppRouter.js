let React = require('react');
let {Router, Route} = require('react-native-redux-router');
let RouterConfig = require('./../Config/Router.js');

let AppRouter = () => (
    <Router>
        {RouterConfig.routes.map((item) => (
            <Route
                key={item.name}
                initial={RouterConfig.initial === item.name}
                navBar={item.navBar ? item.navBar : RouterConfig.navBar}
                title={item.title ? item.title : item.name}
                {...item}
            />
        ))}
    </Router>
);

module.exports = AppRouter;
