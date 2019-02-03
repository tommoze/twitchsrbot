# twitchsrbot

Twitch song request bot

## Getting Started

Install node and git

On macos open terminal and paste:

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 

`brew install node git`

## Download and Install Project

In terminal paste:

`git clone https://github.com/tommoze/twitchsrbot.git`

`cd twitchsrbot`

`npm install`

## Configure Bot

type:

`open config.js`

or navigate in your explorer to project and open config.js file

replace `your_bot_twitch_account_name` with your bot twitch account name

replace `your_oauth_password` with oauth password from https://twitchapps.com/tmi/ it should look like oauth:xxxx

replace `#your_channel_name` with your channel

save file

## Run bot

in terminal type:

`node bot.js`

open http://localhost:3000 in your browser to manage list

## Twitch Chat Commands

`!req artist - title` - requests song and adds to queue

`!cur` - bot says first song in queue aka playing one

`!que` - bot says X songs in queue excluded first one. X can be changed inside config.js `que_limit`. Default value = 3

## Enjoy