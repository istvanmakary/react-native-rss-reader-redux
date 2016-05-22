import {AsyncStorage} from 'react-native';

function rejectWithMessage(error) {
    return Promise.reject(error.message);
}

export default (key, replacer, reviver) => ({
    load() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (err, jsonState) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.parse(jsonState, reviver) || {});
            });
        }).catch(rejectWithMessage);
    },

    save(state) {
        return new Promise((resolve) => {
            const jsonState = JSON.stringify(state, replacer);
            AsyncStorage.setItem(key, jsonState, resolve);
        }).catch(rejectWithMessage);
    }
});
