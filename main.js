
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const client = new Discord.Client();
const commands = new Map();

client.on("ready", () => {
    walk("./commands");
    console.log("I'm ready");
});

client.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.slice(config.prefix.length).split(" ");
    if (commands.has(cmd)) try {commands.get(cmd).run(client, message, args, commands, config)} catch(e) {console.error(e)}
});

client.login(config.token);

/* */ /* */ /* */

function walk(directory) {
    directory += "/";
    fs.readdir(directory, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            fs.stat(directory + file, (err, stats) => {
                if (stats && stats.isDirectory()) walk(directory + file);
                else if (file.substr(-2) === "js") {
                    const cmd = require(directory + file);
                    commands.set(cmd.name, cmd);
                    console.log(`Loaded ${cmd.name} command`);
                }
            })
        });
    });
}

