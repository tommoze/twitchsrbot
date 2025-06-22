const request = require("request");
const login = require("../login");
const config = require("../config");
const emitter = require("./emitter");
const user = require("./user");

const apiDefaults = {
  baseUrl: "https://api.twitch.tv/",
  headers: {
    "Client-ID": login.clientId["Client-ID"],
    // Add OAuth token if available for Helix endpoints
    ...(login.clientId["Authorization"]
      ? { Authorization: login.clientId["Authorization"] }
      : {}),
  },
  json: true,
};

const api = request.defaults(apiDefaults);

let streamerId = "";

const requestStreamerId = (loginName, callback) =>
  api({
    url: "helix/users",
    qs: { login: loginName },
    callback: (err, { statusCode }, body) => {
      if (err || statusCode !== 200 || !body.data || body.data.length === 0) {
        callback(err, null);
      } else {
        callback(null, body.data[0].id);
      }
    },
  });

const requestIsFollower = (userId, callback) =>
  api({
    url: "helix/users/follows",
    qs: { to_id: streamerId, from_id: userId },
    callback: (err, { statusCode }, body) => {
      if (err || statusCode !== 200) {
        callback(err, null);
      } else {
        callback(null, body.total > 0);
      }
    },
  });

const setFollower = ({ userId, displayName }) => {
  requestIsFollower(userId, (err, isFollower) => {
    if (err) {
      console.log("ERR", err);
    } else {
      user.addUser({
        [displayName]: isFollower ? config.roles.follower : config.roles.user,
      });
    }
  });
};

const setStreamerId = () => {
  if (streamerId) {
    return streamerId;
  }

  requestStreamerId(login.twitch.channels[0].substring(1), (err, id) => {
    if (err) {
      console.log("ERR", err);
    } else {
      streamerId = id;
    }
  });
};

emitter.on("api.isfollower", setFollower);

module.exports = {
  setStreamerId,
};
module.exports = {
  setStreamerId,
};
