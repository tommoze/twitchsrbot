const twitch = {
  identity: {
    username: "your_bot_twitch_account_name",
    // Disclaimer: Use at Your Own Risk
    // open incognito tab
    // login to twitch with your bot account
    // go to https://twitchtokengenerator.com/
    // copy access token
    // oauth:pasted_access_token
    password: "oauth:your_bot_access_token",
  },
  channels: ["#your_twitch_channel"],
};

// fill if you wanna limit non followers to 1 request
// get at https://dev.twitch.tv/console/apps
const clientId = {
  "Client-ID": "",
  // Add your OAuth Bearer token for Helix API (format: 'Bearer <token>')
  // 'Authorization': 'Bearer <your_oauth_token>'
};

module.exports = {
  twitch,
  clientId,
};
