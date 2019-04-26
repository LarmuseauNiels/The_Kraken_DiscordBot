
const request = require("request");
const ecoconfig = require("../data/ecoconfig.json");
module.exports = function (client, discord) {
    setInterval(function () {
        let statuschannel = client.channels.get(ecoconfig.serverstatuschannel);
        try {
        request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport + '/info', (err, res, body) => {
            if (err) console.log("ERR 10: " + err);
            let contents = JSON.parse(body);
            /*
            try {
                let players = JSON.parse(body);
                request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport 
                + '/api/v1/analysis/playstyles', (err, res, bodyy) => {
                    if (err) console.log("ERR 21: " + err);
                    let players = JSON.parse(bodyy);
                    try {
                        request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport 
                        + '/api/v1/laws', (err, res, bod) => {
                            if (err) console.log("ERR 25: " + err);
                            let politics = JSON.parse(bod);
                            sendmsg(client, discord, ecoconfig, contents, statuschannel, players);
                            sendplayers(client, discord, ecoconfig, contents, statuschannel, players);
                            sendpolitics(client, discord, ecoconfig, contents, statuschannel, politics);
                        });
                    }
                    catch (err) {
                        console.log("ERR 18: " + err);
                    };*/
                    sendmsg(client, discord, ecoconfig, contents, statuschannel);
                });
            }
            catch (err) {
                console.log("ERR 19: " + err);
                statuschannel.fetchMessages({ limit: 1 }).then(messages => 
                    messages.array()[0].edit("ERR :disappointed: server offline"));
            };
    }, 9000);
}

var sendmsg = function (client, discord, ecoconfig, contents, statuschannel) {
    let embed = new discord.RichEmbed();
    embed.setAuthor("Server status").setDescription("Flaming Palm eco server status");
    embed.addField("Server", '147.135.222.55:6000', false);
    embed.addField("Website", 'http://'+ ecoconfig.serverip + ':' + ecoconfig.serverport, false);
    embed.addField("Total Players", contents.TotalPlayers, true);
    embed.addField("Players online", contents.OnlinePlayers, true);
    embed.addField("Economy", contents.EconomyDesc, true);
    embed.addField("Leader", contents.Leader, true);
    embed.addField("Time Left", (Math.floor(contents.TimeLeft/3600/24)) + ' days '+ (Math.floor(contents.TimeLeft/3600) 
    - (24*Math.floor(contents.TimeLeft/3600/24))) + " hours " + Math.floor((contents.TimeLeft%3600)/60) + " min", true);
    embed.addField("Up time", (Math.floor(contents.TimeSinceStart/3600/24)) + ' days '+ (Math.floor(contents.TimeSinceStart/3600) 
    - (24*Math.floor(contents.TimeSinceStart/3600/24))) + " hours " + Math.floor((contents.TimeSinceStart%3600)/60) + " min", true);
    embed.addField("World Size", contents.WorldSize, true);
    embed.addField("Animals", contents.Animals, true);
    embed.addField("Plants", contents.Plants, true);
    embed.addField("World Objective", contents.WorldObjective, false);
    embed.setURL("http://147.135.222.55:6005/");
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 3 }).then(messages => messages.array()[0].edit(embed));
}
/*
var sendplayers = function (client, discord, ecoconfig, contents, statuschannel, players) {
    let embed = new discord.RichEmbed();
    players.forEach(player => {
        let contributions = "Name "+player.Username+"\n";
        contributions += "Rating: " +  Math.floor(player.Rating*100000) + " thanks to " + player.Playstyle +  "\n";
        player.ContributingStats.forEach(playerstat => {
            contributions += playerstat.Sumary +  "\n";
        });
        embed.addField("player", contributions + "\n " , false);
    });
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 3 }).then(messages => messages.array()[0].edit(embed));
}

var sendpolitics = function (client, discord, ecoconfig, contents, statuschannel, politics) {
    let embed = new discord.RichEmbed();
    politics.forEach(law => {
        let contributions = "";
        let title = "";
        
        contributions += law.Title+"\n";
        contributions += "description: " + law.Description +  "\n";

        if(law.State == "Voting"){
            contributions += "pro: " + law.VotesYes + " \nvotes by: ";
            law.VotedYes.forEach(player => {
                contributions += player +  " ";
            });
            contributions += "\n";
            contributions += "against: " + law.VotesNo + " \nvotes by: ";
            law.VotedNo.forEach(player => {
                contributions += player +  " ";
            });
            contributions +=  "\n";
            contributions += "Time Left:  " + (Math.floor(law.VoteEndTime/3600)) + " hours " 
            + Math.floor((law.VoteEndTime%3600)/60) + " min";
        }
        if(law.State == "Passed") title = "Law";
        if(law.State == "Voting") title = "Proposal";
        embed.addField(title, contributions + " " , false);
    });
    embed.setTimestamp();
    
    statuschannel.fetchMessages({ limit: 3 }).then(messages => messages.array()[1].edit(embed));
}
*/