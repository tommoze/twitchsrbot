const list = require('./list');
const config = require('../config');
const emitter = require('./emitter');

const howRequest = `'${config.request} Artist - Title' to add song`;

function format(item, isUsernameFirst = false) {
    return isUsernameFirst
        ? `@${item.by}: ${item.title}`
        : `${item.title} @${item.by}`
}

function getUsername(context) {
    return context['display-name'];
}

function onRequest(context, msg) {
    const title = msg.replace(config.request, '');

    if (list.isDuplicate(title)) {
        return `@${getUsername(context)}: ${title} is already in queue`;
    }

    if (list.countByUser(getUsername(context)) >= config.userLimit) {
        return `@${getUsername(context)}: ${config.userLimit} 
            max songs in queue reached, please request later`;
    }

    list.add({
        title: title,
        by: getUsername(context)
    });

    if (config.notifyOnRequest) {
        return list.moreThanOne()
            ? `@${getUsername(context)}: ${list.getLength()} position in queue`
            : `@${getUsername(context)}: song will be played after current`;
    }

    return null;
}

function onQueue() {
    return list.moreThanOne()
        ? `${list.getLength()} song${list.moreThanOne() ? 's' : ''} in queue. ${list.getQueue(format)}`
        : `Queue is empty. Use ${howRequest}`;
}

function onMyQueue(context) {
    const out = list.getUserQueue(getUsername(context));

    return out.length
        ? `@${getUsername(context)} your queue: ${out.join(' ')}`
        : `@${getUsername(context)}: you don't have any request, use ${howRequest}`;
}

function onCurrent() {
    return list.getFirst()
        ? format(list.getFirst())
        : `No songs in queue, use ${howRequest}`;
}

function onNotFound(out) {
    emitter.emit('message', `${format(out[0], true)} was not found :(`);
}

emitter.on('notfound', onNotFound);

module.exports = {
    onMyQueue,
    onQueue,
    onRequest,
    onCurrent,
    howRequest,
};
