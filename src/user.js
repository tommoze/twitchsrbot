const config = require('../config');
const emitter = require('./emitter');
const login = require('../login');

let users = {};

const addUser = (user) => { 
    users = { 
        ...users,
        ...user
    };
};

const getLimit = ({ 'user-id': userId, subscriber, 'display-name': displayName }) => {
    if (subscriber && users[displayName] !== config.roles.subscriber) {
        addUser({
            [displayName]: config.roles.subscriber
        });

        return config.requestLimit[config.roles.subscriber];
    }

    if (role = users[displayName]) {
        if (role === config.roles.user) {
            // refetch follower status since tmi.js doesn't provide it
            emitter.emit('api.isfollower', { userId, displayName });
        }

        return config.requestLimit[role];
    }

    if (login.twitch.channels[0].substring(1).toLocaleLowerCase() === displayName.toLowerCase()) {
        addUser({
            [displayName]: config.roles.broadcaster
        });

        return config.requestLimit[config.roles.broadcaster];
    }

    emitter.emit('api.isfollower', { userId, displayName });

    return config.requestLimit[config.roles.follower]
}

module.exports = {
    getLimit,
    addUser,
};
