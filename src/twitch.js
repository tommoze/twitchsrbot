const tmi = require('tmi.js');
const config = require('../config');
const login = require('../login');
const list = require('./list');
const emitter = require('./emitter');

const request = config.request;
const queue = config.queue;
const current = config.current;
const queue_limit = config.queue_limit;
const user_limit = config.user_limit;
const my_queue = config.my_queue;

// Create a client with our options
const client = new tmi.client(login);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

function format(item, isUsernameFirst = false) {
    return isUsernameFirst
        ? `@${item.by}: ${item.title}`
        : `${item.title} @${item.by}`
}

function getUsername(context) {
    return context['display-name'];
}

function onRequest(context, msg) {
    const title = msg.replace(request, '');

    if (list.some(e => e.title === title)) {
        return `@${getUsername(context)}: ${title} is already in queue`;
    }

    const userRequests = list.filter(e => e.by === getUsername(context));

    if (userRequests.length >= user_limit) {
        return `@${getUsername(context)}: ${user_limit} max songs in queue reached, please request later`;
    }

    list.push({
        title: title,
        by: getUsername(context)
    });

    return null;
}

function onQueue() {
    if (list.length > 1) {
        const out = list.slice(1, queue_limit + 1)
            .map((item, i) => `[${i + 1}] ${format(item)}`)
            .join(' ');
        const count = list.length - 1;
        return `${count} ${count > 1 ? 'songs' : 'song'} in queue. ${out}`
    } else {
        return `Queue is empty. Use ${request} to add song`;
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
        return `@${getUsername(context)}: you don't have any request, use '${request} artist title'`;
    }
}

function notFound(out) {
    login.channels.forEach((channel) => {
        client.say(channel , `${format(out[0], true)} was not found :(`);
    })
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
    let out;

    // If the command is known, let's execute it
    if (commandName.startsWith(request)) {
        out = onRequest(context, msg);
    } else if (commandName === queue) {
        out = onQueue();
    } else if (commandName === my_queue) {
        out = onMyQueue(context);
    } else if (commandName === current && list.length > 0) {
        out = format(list[0]);
    }

    out && client.say(target, out);
}

emitter.on('notfound', notFound)

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
