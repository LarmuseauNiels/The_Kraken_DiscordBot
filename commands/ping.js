const request = require("ping");

module.exports = {
    name: "ping",
    desc: "pings the bot",
    example: "ping",
    run: (client, message, args, commands, config) => {
      message.reply("pong")
    }
};
