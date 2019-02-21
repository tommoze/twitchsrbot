const request = require('request');
const login = require('../login');
const config = require('../config');
const emitter = require('./emitter');
const user = require('./user');

const apiDefaults = {
    baseUrl: 'https://api.twitch.tv/',
    headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        ...login.clientId
    },
    json: true
};

const api = request.defaults(apiDefaults);

let streamerId = '';

const requestStreamerId = (login, callback) => api({
    url: 'kraken/users',
    qs: { login },
    callback: (err, { statusCode }, { _total, users }) => {
        if(err || statusCode !== 200 || _total === 0) {
            callback(err, null);
        }
        else {
            callback(null, users[0]._id);
        }
    }
});

const requestIsFollower = (userId, callback) => api({
    url: 'helix/users/follows',
    qs: { to_id: streamerId, from_id: userId },
    callback: (err, { statusCode }, { total }) => {
        if(err || statusCode !== 200) {
            callback(err, null);
        }
        else {
            callback(null, total > 0);
        }
    }
});

const setFollower = ({ userId, displayName }) => {
    requestIsFollower(userId, (err, isFollower) => {
        if(err) {
            console.log('ERR', err);
        }
        else {
            user.addUser({ [displayName]: isFollower ? config.roles.follower : config.roles.user })
        }
    })
}

const setStreamerId = () => {
    if (streamerId) {
        return streamerId;
    }

    requestStreamerId(login.twitch.channels[0].substring(1), (err, id) => {
        if(err) {
            console.log('ERR', err);
        }
        else {
            streamerId = id;
        }
    })
}

emitter.on('api.isfollower', setFollower);

module.exports = {
    setStreamerId
};
