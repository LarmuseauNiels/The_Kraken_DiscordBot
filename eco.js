const request = require("request");
const ecoconfig = require("./data/ecoconfig.json");
module.exports = function () {
    this.starteco = function starteco(client, discord) {
        setInterval(function () {
            let statuschannel = client.channels.get(ecoconfig.serverstatuschannel);
            request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport + '/info', (err, res, body) => {
                if (err) console.log("ERR 10: " + err);
                let contents = JSON.parse(body);
                try {
                    let players = JSON.parse(body);
                    request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport + '/api/v1/analysis/playstyles', (err, res, body) => {
                        if (err) console.log("ERR 21: " + err);
                        let players = JSON.parse(body);
                        request("http://" + ecoconfig.serverip + ':' + ecoconfig.serverport + '/api/v1/laws', (err, res, bod) => {
                            if (err) console.log("ERR 25: " + err);
                            let politics = JSON.parse(bod);
                            sendmsg(client, discord, ecoconfig, contents, statuschannel, players);
                            sendplayers(client, discord, ecoconfig, contents, statuschannel, players);
                            sendpolitics(client, discord, ecoconfig, contents, statuschannel, politics);
                        });
                    });
                }
                catch (err) {
                    console.log("ERR 19: " + err);
                    statuschannel.fetchMessages({ limit: 1 }).then(messages => messages.array()[0].edit("ERR :disappointed: server offline"));
                };
            });
        }, 30000);
    }
}

var sendmsg = function (client, discord, ecoconfig, contents, statuschannel, players) {
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
    embed.addBlankField();
    embed.setURL("http://149.202.201.40:6005/")
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 2 }).then(messages => messages.array()[1].edit(embed));
}

var sendplayers = function (client, discord, ecoconfig, contents, statuschannel, players) {
    let embed = new discord.RichEmbed();
    players.forEach(player => {
        let contributions = "Name "+player.Username+"\n";
        contributions += "Rating: " +  Math.floor(player.Rating*100000) + " thanks to " + player.Playstyle +  "\n";
        player.ContributingStats.forEach(playerstat => {
            contributions += playerstat.Summary +  "\n";
        });
        embed.addField("player", contributions + "\n " , false);
    });
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 2 }).then(messages => messages.array()[0].edit(embed));
}

var sendpolitics = function (client, discord, ecoconfig, contents, statuschannel, politics) {
    let embed = new discord.RichEmbed();
    politics.forEach(law => {
        let contributions;
        if(law.State == "Passed")contributions += "Law:  ";
        if(law.State == "Voting") contributions += "Proposal:  ";
        contributions += law.Title+"\n";
        contributions += "description: " + law.Description +  "\n";
        contributions += "pro: " + law.VotesYes + " votes by: " + + ;
        law.VotedYes.forEach(player => {
            contributions += player +  " ";
        });
        contributions += "\n";
        contributions += "against: " + law.VotesNo + " votes by: " + + ;
        law.VotedNo.forEach(player => {
            contributions += player +  " ";
        });
        contributions +=  "\n";
        if(law.State == "Voting") contributions += "Time Left" + (Math.floor(law.VoteEndTime/3600/24)) + ' days '+ (Math.floor(law.VoteEndTime/3600) - (24*Math.floor(law.VoteEndTime/3600/24))) + " hours " + Math.floor((law.VoteEndTime%3600)/60) + " min";
        embed.addField("Law", contributions + "\n " , false);
    });
    embed.setTimestamp();
    statuschannel.fetchMessages({ limit: 2 }).then(messages => messages.array()[0].edit(embed));
}


  