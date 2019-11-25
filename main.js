const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');

class Client extends Discord.Client {
    constructor() {
      super();
      this.commands = new Discord.Collection();
      this.prefix = "!";
      this.discord = Discord;
      this.queue = new Map();

    }

    playsong(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);
	
		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				console.log('Music ended!');
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
			})
			.on('error', error => {
				console.error(error);
			});
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	}

    
}
const client = new Client();

client.on("ready", () => {
    console.log("Loading commands");
    walk("./commands");
    loadmodules();
});

client.on("message", message => {
    try{
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.slice(client.prefix.length).split(" ");
    if (client.commands.has(cmd)) 
    try {client.commands.get(cmd).run(client, message, args)} 
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
                    if(client.commands.has(cmd.name)){//logger.send("`ERR: dublicated command name: "+cmd.name+"`")
                }
                    else{client.commands.set(cmd.name, cmd)};
                    cmd.alias.forEach(item => {
                        if(client.commands.has(item)){//logger.send("`ERR: dublicate command name: "+item+"`")
                    }
                        else{client.commands.set(item, cmd)}
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

    // MUSIC BOT IS BROKEN
    // client.music = require("discord.js-musicbot-addon");
    // let musicconfig = require("./data/musicconfig.json");
    // client.music.start(client,musicconfig);
    
    //require("./modules/eco.js")(client, Discord);
    //require("./modules/mcserver.js")(client, Discord);
    require("./modules/chansubs.js")(client);
    
}