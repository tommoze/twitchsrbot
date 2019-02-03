const express = require('express');
const tmi = require('tmi.js');
const config = require('./config');

// Define configuration options
const opts = {
  identity: {
    username: config.username,
    password: config.password
  },
  channels: config.channels
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

let list = [];

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith(config.req)) {
    const out = `${msg.replace(config.req, '')} @${context.username}`;

    if (list.includes(out)) {
        return;
    }

    list.push(out);
  } else if (commandName === config.que) {
    let msg;

    if (list.length > 1) {
        const out = list.slice(1, config.que_limit + 1)
            .map((item, i) => `[${i + 1}] ${item}`)
            .join(' ');
        const count = list.length - 1;
        msg = `${count} ${count > 1 ? 'songs' : 'song'} in queue. ${out}`
    } else {
        msg = `Queue is empty. Use ${config.que} to add song`;
    }

    client.say(target, msg);
  } else if (commandName === config.cur && list.length > 0) {
    client.say(target, list[0]);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Run  http server
const app = express();
app.set('view engine', 'pug')
const port = 3000;

app.get('/delete', function(req, res) {
    list.splice(req.param.i, 1);
    res.send({});
});

app.get('/', (req, res) => {
    res.render('index', { list: list })
});
app.listen(port);