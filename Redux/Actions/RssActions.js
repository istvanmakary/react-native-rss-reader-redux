import {
    VALIDATION_SUCCESS,
    ERROR,
    TRIGGER_SAVE,
    RESET_ADD_FROM,
    GET_RSS_ITEM
} from './../Config/RssConfig';

let validateRss = (data) => (/^(http|https):\/\/[^ "]+$/.test(data));

let updateRssFeeds = (data) => (
    validateRss(data.url) ? {
        type: VALIDATION_SUCCESS,
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

function resetAddForm() {
    return {
        type: RESET_ADD_FROM
    };
}

function getRssItem(data) {
    return {
        type: GET_RSS_ITEM,
        data
    };
}

module.exports = {
    updateRssFeeds,
    triggerSave,
    resetAddForm,
    getRssItem
};
