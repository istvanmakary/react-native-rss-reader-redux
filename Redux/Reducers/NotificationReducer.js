import {DISPLAY, HIDE} from './../Config/NotificationConfig';

let initialState = {
    notification: ''
};

let notificationReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case DISPLAY:
            return Object.assign({}, state, {
                notification: {
                    message: action.data.message,
                    type: (action.data.type === 'success' ? 'success' : 'warning')
                }
            });
        case HIDE:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
};

module.exports = notificationReducer;
