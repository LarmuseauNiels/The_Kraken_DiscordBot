const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const commands = new Discord.Collection();
const prefix = "!";

client.on("ready", () => {
    console.log("Loading commands");
    walk("./commands");
    loadmodules();
});

client.on("message", message => {
    try{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.slice(prefix.length).split(" ");
    if (commands.has(cmd)) 
    try {commands.get(cmd).run(client, message, args, commands, Discord)} 
        catch(e) {console.error(e);
    }
    }catch(e){
        console.log("`ERR: somehow a certain message wasn't able to be interpreted: "+message+"`");}
});

client.login(process.env.TOKEN);

/* */ /* Commands */ /* */

function walk(directory) {
    directory += "/";
    fs.readdir(directory, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            fs.stat(directory + file, (err, stats) => {
                if (stats && stats.isDirectory()) walk(directory + file);
                else if (file.substr(-2) === "js") {
                    const cmd = require(directory + file);
                    if(commands.has(cmd.name)){//logger.send("`ERR: dublicated command name: "+cmd.name+"`")
                }
                    else{commands.set(cmd.name, cmd)};
                    cmd.alias.forEach(item => {
                        if(commands.has(item)){//logger.send("`ERR: dublicate command name: "+item+"`")
                    }
                        else{commands.set(item, cmd)}
                    });
                    console.log(`Loaded ${cmd.name} command`);
                }
            })
        });
    });
}

/* */ /* */ /* */ 

function loadmodules(){
    console.log("Loading Modules");

    //client.music  = require("./modules/music-module.js");
    client.music = require("discord.js-musicbot-addon");
    let musicconfig = require("./data/musicconfig.json");
    client.music.start(client,musicconfig);
    
    //require("./modules/eco.js")(client, Discord);
    //require("./modules/mcserver.js")(client, Discord);
    require("./modules/chansubs.js")(client);
    
}