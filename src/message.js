const list = require('./list');
const config = require('../config');
const emitter = require('./emitter');

const howRequest = `'${config.request} Artist - Title'`;

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

    if (list.some(e => e.title === title)) {
        return `@${getUsername(context)}: ${title} is already in queue`;
    }

    const userRequests = list.filter(e => e.by === getUsername(context));

    if (userRequests.length >= config.userLimit) {
        return `@${getUsername(context)}: ${config.userLimit} 
            max songs in queue reached, please request later`;
    }

    list.push({
        title: title,
        by: getUsername(context)
    });

    if (config.notifyOnRequest) {
        return list.length > 1
            ? `@${getUsername(context)}: ${list.length - 1} position in queue`
            : `@${getUsername(context)}: song will be played after current`;
    }

    return null;
}

function onQueue() {
    if (list.length > 1) {
        const out = list.slice(1, config.queueLimit + 1)
            .map((item, i) => `[${i + 1}] ${format(item)}`)
            .join(' ');

        const count = list.length - 1;

        return `${count} ${count > 1 ? 'songs' : 'song'} in queue. ${out}`;
    } else {
        return `Queue is empty. Use ${howRequest} to add song`;
    }
}

function onMyQueue(context) {
    const out = list.reduce((acc, cur, i) => {
        if (cur.by === getUsername(context) && i !== 0) {
            return [
                ...acc,
                `[${i}] ${cur.title}`
            ];
        }
        return acc;
    }, []);

    if (out.length) {
        return `@${getUsername(context)} your queue: ${out.join(' ')}`;
    } else {
        return `@${getUsername(context)}: you don't have any request, use ${howRequest}`;
    }
}

function onCurrent() {
    return list.length > 0
        ? format(list[0])
        : null;
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
