const list = require('./list');
const config = require('../config');
const emitter = require('./emitter');
const user = require('./user');

const howRequest = `'${config.request} Artist - Title' to add song`;

const format = (item, isUsernameFirst = false) => isUsernameFirst
    ? `@${item.by}: ${item.title}`
    : `${item.title} @${item.by}`;

const getUsername = context => context['display-name'];

const getLimitMessage = (userLimit) => {
    switch(userLimit) {
        case config.requestLimit.user:
            return `click FOLLOW button to gain ${config.requestLimit.follower} slots in queue`;
        case config.requestLimit.follower:
            return `click SUBSCRIBE button to gain ${config.requestLimit.subscriber} slots in queue`;
        case config.requestLimit.subscriber:
            return `wait till one of your requests will be played`;
    }
}

const onRequest = (context, title) => {
    if (!title) { return howRequest; }
    const by = getUsername(context);

    if (list.isDuplicate(title)) {
        return `@${by}: ${title} is already in queue`;
    }

    const userLimit = user.getLimit(context);
    if (list.countByUser(by) >= userLimit) {
        return `@${by}: ${userLimit} max songs in queue reached, please ${getLimitMessage(userLimit)}`;
    }

    list.add({ title, by });

    if (config.notifyOnRequest) {
        return list.moreThanOne()
            ? `@${by}: ${list.getLength()} position in queue`
            : `@${by}: song will be played after current`;
    }

    return null;
}

const onQueue = () => list.moreThanOne()
    ? `${list.getLength()} song${list.moreThanOne() ? 's' : ''} in queue. ${list.getQueue(format)}`
    : `Queue is empty. Use ${howRequest}`;

const onMyQueue = context => list.hasUserRequests(getUsername(context))
    ? `@${getUsername(context)} your queue: ${list.getUserQueue(getUsername(context)).join(' ')}`
    : `@${getUsername(context)}: you don't have any request, use ${howRequest}`;

const onCurrent = () => list.getFirst()
    ? format(list.getFirst())
    : `No songs in queue, use ${howRequest}`;

const onNotFound = out => emitter.emit('message', `${format(out[0], true)} was not found :(`);

emitter.on('notfound', onNotFound);

module.exports = {
    onMyQueue,
    onQueue,
    onRequest,
    onCurrent,
    howRequest,
};
