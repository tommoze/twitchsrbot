const express = require('express');
const tmi = require('tmi.js');
const config = require('./config');

const channels = config.channels;
const request = config.request;
const queue = config.queue;
const current = config.current;
const queue_limit = config.queue_limit

// Define configuration options
const opts = {
    identity: {
        username: config.username,
        password: config.password,
    },
    channels: config.channels,
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

let list = [];

function format(item) {
    return `${item.title} @${item.by}`;
}

function onRequest(context, msg) {
    const title = msg.replace(request, '');

    if (list.includes(title)) {
        return;
    }

    list.push({
        title: title,
        by: context.username
    });
}

function onQueue() {
    if (list.length > 1) {
        const out = list.slice(1, queue_limit + 1)
            .map((item, i) => `[${i + 1}] ${format(item)}`)
            .join(' ');
        const count = list.length - 1;
        return `${count} ${count > 1 ? 'songs' : 'song'} in queue. ${out}`
    } else {
        return `Queue is empty. Use ${queue} to add song`;
    }
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
    let out;

    // If the command is known, let's execute it
    if (commandName.startsWith(request)) {
        onRequest(context, msg);
    } else if (commandName === queue) {
        out = onQueue();
    } else if (commandName === current && list.length > 0) {
        out = format(list[0]);
    }

    out && client.say(target, out);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// Run  http server
const app = express();
app.set('view engine', 'pug')
const port = 3000;

app.get('/delete', function (req, res) {
    const out = list.splice(req.query.index, 1);

    if (req.query.notfound) {
        client.say(channels[0], `${format(out[0])} was not found :(`);
    }

    res.send({});
});

app.get('/moveup', function(req, res) {
    if (parseInt(req.query.index) !== 0) {
        list.splice(req.query.index - 1, 0, list.splice(req.query.index, 1)[0]);
        res.send({});
    }
});

app.get('/movedown', function(req, res) {
    if (parseInt(req.query.index) !== list.length) {
        list.splice(req.query.index + 1, 0, list.splice(req.query.index, 1)[0]);
        res.send({});
    }
});

app.get('/', (req, res) => {
    res.render('index', { list: list })
});
app.listen(port);
