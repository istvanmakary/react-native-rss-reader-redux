let {DISPLAY, HIDE} = require('./../Config/NotificationConfig');

function displayNotification(data) {
    return {
        type: DISPLAY,
        data
    };
}

function hideNotification(data) {
    return {
        type: HIDE
    };
}

module.exports = {
    displayNotification,
    hideNotification
};
