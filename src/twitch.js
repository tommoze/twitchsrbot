const tmi = require('tmi.js');
const config = require('../config');
const login = require('../login');
const emitter = require('./emitter');
const message = require('./message');

// Create a client with our options
const client = new tmi.client(login);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('disconnected', onDisconnectedHandler);

// Connect to Twitch:
client.connect();

function onMessage(msg) {
    login.channels.forEach((channel) => client.say(channel, msg));
}

function getCommand(msg) {
    // Remove whitespace from chat message
    let command = msg.trim();

    return command.startsWith(config.request)
        ? config.request
        : command;
}

function say(target, msg) {
    msg && client.say(target, msg);
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // If the command is known, let's execute it
    switch(getCommand(msg)) {
        case config.request:
            say(target, message.onRequest(context, msg));
            break;
        case config.queue:
            say(target, message.onQueue());
            break;
        case config.myQueue:
        case config.myRequest:
            say(target, message.onMyQueue(context));
            break;
        case config.current:
            say(target, message.onCurrent());
            break;
    }
}

emitter.on('message', onMessage);

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    onMessage(`Hello people, I'm here to serve, use ${message.howRequest}`);
}

function onDisconnectedHandler(reason) {
    console.log(`* Disconnected due to ${reason}`);
}
