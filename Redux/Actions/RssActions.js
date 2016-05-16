let {ADD, TYPE} = require('./../Config/RssConfig');

function addRss(data) {
    return {
        type: ADD,
        data
    };
}

function typeRss(data) {
    return {
        type: TYPE,
        data
    };
}

module.exports = {
    addRss,
    typeRss
};
