const request = require("request");
const ecoconfig = require("./data/ecoconfig.json");
module.exports = function () {
    this.starteco = function starteco(client, discord) {
        setInterval(function () {
            let statuschannel = client.channels.get(ecoconfig.serverstatuschannel);
            request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport + '/info', (err, res, body) => {
                if (err) console.log("ERR 10: " + err);
                try {
                    let temp = body;
                    let contents = JSON.parse(temp);
                    sendmsg(client, discord, ecoconfig, contents, statuschannel);
                }
                catch (err) {
                    console.log("ERR 19: " + err);
                    statuschannel.fetchMessages({ limit: 1 }).then(messages => messages.array()[0].edit("ERR :disappointed: server offline"));
                };
            });
        }, 1000);
    }
}

var sendmsg = function (client, discord, ecoconfig, contents, statuschannel) {
    let embed = new discord.RichEmbed();
    embed.setAuthor("Server status").setDescription("The Legion eco server status");
    embed.addField("Server", contents.Description, false);
    embed.addField("serverip", ecoconfig.serverip + ':' + ecoconfig.serverport, true);
    embed.addField("Total Players", contents.TotalPlayers, true);
    embed.addField("Players online", contents.OnlinePlayers, true);
    embed.addField("Time Left", (Math.floor(contents.TimeLeft/3600/24)) + ' days '+ (Math.floor(contents.TimeLeft/3600) - (24*Math.floor(contents.TimeLeft/3600/24))) + " hours " + Math.floor((contents.TimeLeft%3600)/60) + " min", true);
    embed.addField("Animals", contents.Animals, true);
    embed.addField("Plants", contents.Plants, true);
    embed.addField("World Size", contents.WorldSize, true);
    embed.addField("Economy", contents.EconomyDesc, true);
    embed.addField("Leader", contents.Leader, true);
    embed.addField("World Objective", contents.WorldObjective, false);

    embed.setURL("http://149.202.201.40:6005/")
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 1 }).then(messages => messages.array()[0].edit(embed));
}


  