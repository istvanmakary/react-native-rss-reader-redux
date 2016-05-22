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

import {
    REDUX_STORAGE_LOAD
} from './../Config/Storage';

let initialState = {
    success: false,
    fetching: false,
    feeds: [],
    errorMessage: false,
    triggerSave: false,
    editItem: false,
    loadedFeeds: []
};

let rssReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REDUX_STORAGE_LOAD:
            return Object.assign({}, state, action.payload.rssReducer || {});
        case ADD_RSS:
            return Object.assign({}, state, {
                success: true,
                errorMessage: false,
                triggerSave: false,
                feeds: [...state.feeds, {
                    id: `feed-item-${state.feeds.length}`,
                    url: action.data.url,
                    order: state.feeds.length,
                    status: 'fetching'
                }]
            });
        case UPDATE_RSS:
            return Object.assign({}, state, {
                success: true,
                errorMessage: false,
                triggerSave: false,
                feeds: state.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }

                    return Object.assign({}, action.data, {
                        status: 'fetching'
                    });
                })
            });
        case ERROR:
            return Object.assign({}, state, {
                success: false,
                errorMessage: 'The entered rss feed is not valid!',
                triggerSave: false
            });
        case DUPLICATED_FEED:
            return Object.assign({}, state, {
                success: false,
                errorMessage: 'This feed already exists!',
                triggerSave: false
            });
        case TRIGGER_SAVE:
            return Object.assign({}, state, {
                triggerSave: true
            });
        case RESET_ADD_FROM:
            return Object.assign({}, state, {
                errorMessage: false,
                success: false,
                triggerSave: false,
                editItem: false
            });
        case GET_RSS_ITEM:
            return Object.assign({}, state, {
                editItem: state.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }
                })
            });
        case DELETE_RSS_FEED:
            return Object.assign({}, state, {
                success: true,
                errorMessage: false,
                triggerSave: false,
                feeds: state.feeds.reduce((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }
                })
            });
        case RSS_FETCH_START:
            return Object.assign({}, state, {
                fetching: true
            });
        case RSS_FETCH_FAIL:
            return Object.assign({}, state, {
                fetching: false,
                feeds: state.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }

                    return Object.assign({}, rss, {
                        status: 'failed'
                    });
                })
            });
        case RSS_FETCH_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                feeds: state.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }

                    return Object.assign({}, rss, {
                        status: 'success'
                    });
                }),
                loadedFeeds: [...state.loadedFeeds, action.data.result]
            });
        default:
            return state;
    }
};

module.exports = rssReducer;
