import {DISPLAY, HIDE} from './../Config/NotificationConfig';

function displayNotification(data) {
    return {
        type: DISPLAY,
        data
    };
}

function hideNotification() {
    return {
        type: HIDE
    };
}

module.exports = {
    displayNotification,
    hideNotification
};
