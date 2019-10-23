const ms = require("ms");

module.exports = {
    name: "mute",
    desc: "Mutes a user",
    example: "!tempmute @user 1s/m/h/d",
    alias: ["tmute","mute"],
    run: (client, message, args, commands, config, discord, logger) => {
        message.reply("Command not implemented.");
    }
}