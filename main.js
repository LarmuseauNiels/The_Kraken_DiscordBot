const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');
const mysql = require('mysql');
class Client extends Discord.Client {
    constructor() {
      super();
      this.commands = new Discord.Collection();
      this.prefix = "\\";
      this.discord = Discord;
      this.queue = new Map();
      this.DBconnection = mysql.createPool({
        connectionLimit : 10,
        host            : process.env.DBHOST,
        user            : 'root',
        password        : process.env.DBPASS,
        database        : 'discordstats'
      });
    }

    playsong(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);
        
		if (!song) {
			serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            this.user.setActivity("");
			return;
        }
        else{
            this.user.setActivity(song.title)
        }
	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				console.log('Music ended!');
				serverQueue.songs.shift();
				this.playsong(message, serverQueue.songs[0]);
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
                    if(client.commands.has(cmd.name)){
                }
                    else{client.commands.set(cmd.name, cmd)};
                    cmd.alias.forEach(item => {
                        if(client.commands.has(item)){
                    }
                        else{client.commands.set(item, cmd)}
                    });
                    console.log(`Loaded ${cmd.name} command`);
                }
            })
        });
    });
}

/* */ /* Load modules */ /* */ 

function loadmodules(){
    console.log("Loading Modules");
    require("./modules/chansubs.js")(client);
    require("./modules/statistics.js")(client);
    require("./modules/webapi.js")(client);
}

