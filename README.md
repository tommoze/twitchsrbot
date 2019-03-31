# twitchsrbot

Twitch song request bot\
Node, express, next.js, react, socketio

![preview](https://user-images.githubusercontent.com/33844718/52885298-65309f80-3179-11e9-8a50-a16d0addcc87.png)

## Getting Started

### macOS

---

Install node and git\
On macos open terminal and paste:\
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` \
`brew install node git`

### windows

---

https://git-scm.com/downloads \
https://nodejs.org/en/download

## Download and Install Project

---

### macOS

---

In terminal paste:\
`git clone https://github.com/tommoze/twitchsrbot.git`\
`cd twitchsrbot`\
`npm install`

### windows

---

Press `win` key\
type `cmd` press enter\
type `cd \`\
`git clone https://github.com/tommoze/twitchsrbot.git`\
`cd twitchsrbot`\
`npm install`

## Configure Bot

---

Navigate in your explorer to project and open `login.js` file\
if you're on `windows` its in `c:\twitchsrbot\`\
if you're on `macOS` its in `/Users/{userName}/twitchsrbot/`/
replace `your_bot_twitch_account_name` with your bot twitch account name\
replace `your_bot_oauth_password` with oauth password from https://twitchapps.com/tmi/ it should look like oauth:xxxx\
replace `#your_twitch_channel` with your channel\
if you want to limit non followers to 1 request:\
replace `'Client-ID': ''` with `'Client-ID': 'your_bot_account_generated_client_id'` from https://glass.twitch.tv/console/apps/create \
save file

## Run bot

---

in `terminal` or `cmd` type:\
`npm start`\
open http://localhost:3000 in your browser to manage list

## Update bot

---

type in terminal:\
`git pull`\
`rm -rf node_modules/`\
`npm install`

## Twitch Chat Commands

---

`!req Artist - Title` - requests song and adds to queue\
`!cur` - bot says first song in queue aka playing one\
`!que` - bot says X songs in queue excluded first one. X can be changed inside config.js\
`!myque` or `!myreq` - bot says user queue songs

## Enjoy
