const list = require('./list');
const config = require('../config');
const emitter = require('./emitter');

const howRequest = `'${config.request} Artist - Title' to add song`;

const format = (item, isUsernameFirst = false) => isUsernameFirst
    ? `@${item.by}: ${item.title}`
    : `${item.title} @${item.by}`;

const getUsername = context => context['display-name'];

const onRequest = (context, title) => {
    if (!title) { return howRequest; }
    const by = getUsername(context);

    if (list.isDuplicate(title)) {
        return `@${by}: ${title} is already in queue`;
    }

    if (list.countByUser(by) >= config.userLimit) {
        return `@${by}: ${config.userLimit} max songs in queue reached, please request later`;
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
