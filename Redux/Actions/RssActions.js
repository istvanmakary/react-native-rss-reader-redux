import RssLoader from './../../lib/RssLoader';
import {
    ADD_RSS,
    UPDATE_RSS,
    ERROR,
    TRIGGER_SAVE,
    RESET_ADD_FROM,
    GET_RSS_ITEM,
    DELETE_RSS_FEED,
    RSS_FETCH_START,
    RSS_FETCH_FAIL,
    RSS_FETCH_SUCCESS,
    DUPLICATED_FEED
} from './../Config/RssConfig';

let validateRss = (data) => (/^(http|https):\/\/[^ "]+$/.test(data));
let findFeed = (feeds, url) => {
    if (!feeds.length) {
        return false;
    }

    return feeds.filter((item) => {
        if (item.url === url) {
            return item;
        }
    })[0];
};

let updateRssFeeds = (data) => (
    (dispatch, getState) => {
        let valid;
        let duplicated;

        valid = validateRss(data.url);
        duplicated = data.id ? false : findFeed(getState().rssReducer.feeds, data.url);

        if (valid && !duplicated) {
            let feed;

            dispatch({
                type: data.id ? UPDATE_RSS : ADD_RSS,
                data
            });

            feed = findFeed(getState().rssReducer.feeds, data.url);
            dispatch({
                type: RSS_FETCH_START
            });

            RssLoader.parseRss(data.url).then((result) => {
                dispatch({
                    type: RSS_FETCH_SUCCESS,
                    data: {
                        result,
                        id: feed.id
                    }
                });
            }, () => dispatch({
                type: RSS_FETCH_FAIL,
                data: {id: feed.id}
            }));
        } else if (valid && duplicated) {
            dispatch({
                type: DUPLICATED_FEED,
                data
            });
        } else {
            dispatch({
                type: ERROR
            });
        }
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

function deleteRssFeed(data) {
    return {
        type: DELETE_RSS_FEED,
        data
    };
}

module.exports = {
    updateRssFeeds,
    triggerSave,
    resetAddForm,
    getRssItem,
    deleteRssFeed
};
