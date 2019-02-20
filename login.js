const twitch = {
    identity: {
        username: 'your_bot_twitch_account_name',
        // get at https://twitchapps.com/tmi/ 
        password: 'your_bot_oauth_password',
    },
    channels: [
        '#your_twitch_channel'
    ],
};

// fill if you wanna limit non followers to 1 request
// get at https://glass.twitch.tv/console/apps/create
const clientId = {
    'Client-ID': ''
};

module.exports = {
    twitch,
    clientId
};
