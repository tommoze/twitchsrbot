const roles = {
    user: 'user',
    follower: 'follower',
    subscriber: 'subscriber',
    broadcaster: 'broadcaster',
}

module.exports = {
    request: '!req',
    queue: '!que',
    current: '!cur',
    myQueue: '!myque',
    myRequest: '!myreq',
    displayQueue: 3,
    notifyOnRequest: true,
    requestLimit: {
        [roles.user]: 1,
        [roles.follower]: 3,
        [roles.subscriber]: 6,
        [roles.broadcaster]: 9999,
    },
    roles
};
