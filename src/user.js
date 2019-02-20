const config = require('../config');
const emitter = require('./emitter');

let users = {};

const roles = {
    user: 'user',
    follower: 'follower',
    subscriber: 'subscriber',
}

const addUser = (user) => { 
    users = { 
        ...users,
        ...user
    };
};

const getLimit = ({ 'user-id': userId, subscriber, mod, 'display-name': displayName }) => {
    if ((subscriber || mod) && users[displayName] !== roles.subscriber) {
        addUser({
            [displayName]: roles.subscriber
        });

        return config.requestLimit[roles.subscriber];
    }

    if (role = users[displayName]) {
        if (role === roles.user) {
            // refetch follower status since tmi.js doesn't provide it
            emitter.emit('api.isfollower', { userId, displayName });
        }

        return config.requestLimit[role];
    }

    emitter.emit('api.isfollower', { userId, displayName });

    return config.requestLimit[roles.follower]
}

module.exports = {
    getLimit,
    addUser,
    roles,
};
