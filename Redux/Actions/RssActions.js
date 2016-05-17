import {ADD_SUCCESS, ERROR, TRIGGER_SAVE, HIDE_ERROR} from './../Config/RssConfig';

let validateRss = (data) => (/^(http|https):\/\/[^ "]+$/.test(data));

let addRss = (data) => (
    validateRss(data) ? {
        type: ADD_SUCCESS,
        data
    } : {
        type: ERROR,
        data
    }
);

function triggerSave() {
    return {
        type: TRIGGER_SAVE
    };
}

function hideError() {
    return {
        type: HIDE_ERROR
    };
}

module.exports = {
    addRss,
    triggerSave,
    hideError
};
