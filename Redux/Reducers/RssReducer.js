import {ADD_SUCCESS, ERROR, TRIGGER_SAVE, HIDE_ERROR} from './../Config/RssConfig';
// let DOMParser = require('xmldom').DOMParser;

let initialState = {
    success: false,
    feeds: [],
    errorMessage: false,
    triggerSave: false
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
    switch (action.type) {
        case ADD_SUCCESS:
            state.feeds.push({
                id: `feed-item-${state.feeds.length}`,
                url: action.data,
                order: state.feeds.length
            });

            return Object.assign({}, state, {
                success: true,
                errorMessage: false,
                triggerSave: false
            });
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
        case HIDE_ERROR:
            return Object.assign({}, state, {
                errorMessage: false
            });
        default:
            return state;
    }
};

module.exports = rssReducer;
