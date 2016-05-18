import {
    VALIDATION_SUCCESS,
    ERROR,
    TRIGGER_SAVE,
    RESET_ADD_FROM,
    GET_RSS_ITEM
} from './../Config/RssConfig';
// let DOMParser = require('xmldom').DOMParser;

let initialState = {
    success: false,
    feeds: [],
    errorMessage: false,
    triggerSave: false,
    editItem: false
};

let fetchRss = (url) => (
    new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                resolve(request.responseText);
            } else {
                reject(e);
            }
        };

        request.open('GET', url);
        request.send();
    })
);

let parseXML = (xml) => {
    let i;
    let items;
    let result = {
        header: {
            title: xml.getElementsByTagName('title')[0].textContent,
            link: xml.getElementsByTagName('link')[0].textContent
        },
        sections: []
    };

    items = xml.getElementsByTagName('item');
    i = 0;

    while (i < items.length) {
        if (items.hasOwnProperty(i)) {
            result.sections.push({
                id: i,
                title: items[i].getElementsByTagName('title')[0].textContent,
                link: items[i].getElementsByTagName('link')[0].textContent,
                description: items[i].getElementsByTagName('description')[0].textContent
            });

            i++;
        }
    }
};

let parseResult = (response) => {
    let success = true;
    let setError = () => {success = false;};

    let dom = new DOMParser({
        errorHandler: {
            warning: setError,
            error: setError,
            fatalError: setError
        }
    }).parseFromString(response, 'text/xml');

    return success ? dom : false;
};
// fetchRss(url).then((response) => {
//     let dom = parseResult(response);
//
//     if (dom) {
//         let parsedResult = parseXML(dom, state);
//         let currentFeed = state.feeds;
//
//         currentFeed.push(Object.create({}, {url}, parsedResult.result));
//
//         currentFeed = currentFeed.map((feed, i) => {
//             if (!feed.id) {
//                 return Object.create({}, feed, {id: `section-${i}`});
//             }
//
//             return feed;
//         });
//
//         result = {
//             currentFeed,
//             success: true,
//             url: '',
//             error: null
//         };
//     } else {
//         result.error = 'Couldn\'t parse the given feed!';
//     }
// }, () => {
//     result.error = 'Couldn\'t fetch the given feed!';
// });

let rssReducer = (state = initialState, action = {}) => {
    let newState;

    switch (action.type) {
        case VALIDATION_SUCCESS:
            newState = Object.assign({}, state, {
                success: true,
                errorMessage: false,
                triggerSave: false
            });

            if (action.data.id) {
                newState.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }

                    return action.data;
                });
            } else {
                newState.feeds.push({
                    id: `feed-item-${state.feeds.length}`,
                    url: action.data.url,
                    order: state.feeds.length
                });
            }

            return newState;
        case ERROR:
            return Object.assign({}, state, {
                success: false,
                errorMessage: 'The entered rss feed is not valid!',
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
                triggerSave: false
            });
        case GET_RSS_ITEM:
            return Object.assign({}, state, {
                editItem: state.feeds.map((rss) => {
                    if (rss.id !== action.data.id) {
                        return rss;
                    }
                })
            });
        default:
            return state;
    }
};

module.exports = rssReducer;
