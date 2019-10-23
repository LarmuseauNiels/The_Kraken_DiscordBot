const ms = require("ms");

module.exports = {
    name: "unmute",
    desc: "Unmutes a muted user",
    example: "!unmute @user",
    alias: ["umute","undomute"],
    run: (client, message, args, commands,  discord) => {
        message.reply("Command not implemented.");
    }
}