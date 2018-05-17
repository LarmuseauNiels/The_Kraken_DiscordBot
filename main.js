const version = "1.0.2";
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const client = new Discord.Client();
const commands = new Map();
const Music = require('discord.js-musicbot-addon-niels');
const musicconfig = require("./data/musicconfig.json");
const music = new Music(client, musicconfig);
var logger;

client.on("ready", () => {
    logger = client.channels.get("438423962159022091");
    logger.send("`INFO: bot started version "+version+"`");
    console.log("Loading commands");
    walk("./commands");
    //require("./eco.js")();
    //starteco(client, Discord);
});

client.on("message", message => {
    try{
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.slice(config.prefix.length).split(" ");
    if (commands.has(cmd)) try {commands.get(cmd).run(client, message, args, commands, config, Discord, logger)} catch(e) {console.error(e);logger.send('`ERR '+cmd.name+' crached:'+e+'`')}
    }catch(e){logger.send("`ERR: somehow a certain message wasn't able to be interpreted: "+message+"`");}
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
                    if(commands.has(cmd.name)){logger.send("`ERR: dublicated command name: "+cmd.name+"`")}else{commands.set(cmd.name, cmd)};
                    cmd.alias.forEach(item => {if(commands.has(item)){logger.send("`ERR: dublicate command name: "+item+"`")}else{commands.set(item, cmd)}});
                    console.log(`Loaded ${cmd.name} command`);
                }
            })
        });
    });
}

