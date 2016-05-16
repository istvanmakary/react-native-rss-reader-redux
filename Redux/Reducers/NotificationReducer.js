let {DISPLAY, HIDE} = require('./../Config/NotificationConfig');

let initialState = {
    notification: ''
};

let notificationReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case DISPLAY:
            return Object.assign({}, state, {notification: action.data});
        case HIDE:
            return Object.assign({}, state, initialState);
    }

    return state;
};

module.exports = notificationReducer;
