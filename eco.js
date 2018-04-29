const request = require("request");
const ecoconfig = require("./data/ecoconfig.json");
module.exports = function () {
    this.starteco = function starteco(client, discord) {
        setInterval(function () {
            let statuschannel = client.channels.get(ecoconfig.serverstatuschannel);
            request("http://query.li/api/eco/" + ecoconfig.serverip + '/' + ecoconfig.serverport, (err, res, body) => {
                if (err) statuschannel.send(err); return;
                try {
                    let contents = JSON.parse(body);
                    if (contents.status.error) { statuschannel.send(contents.status.message) }
                    else {
                        request("http://query.li/api/eco/" + ecoconfig.serverip + '/' + ecoconfig.serverport, (err, res, body) => {
                            if (err) statuschannel.send(err); return;
                            try {
                                let ecoapi = JSON.parse(body);
                                let embed = new discord.RichEmbed();
                                embed.setAuthor("Server status").setDescription("The Legion eco server status");
                                embed.addField("Server", contents.game.info.server_name, false);
                                embed.addField("serverip", ecoconfig.serverip + ':' + ecoconfig.serverport, false);
                                embed.addField("Game version", contents.game.info.version, false);
                                embed.addField("Players", contents.game.info.max_players, false);
                                embed.addField("Players online", ecoapi.is_online, false);
                                embed.addField("Map size", contents.game.info.map, false);
                                embed.addField("Economy", contents.game.info.details.EconomyDesc, false);
                                embed.addField("World Leader", contents.game.info.details.Leader, false);
                                embed.setTimestamp();
                                statuschannel.fetchMessages({ limit: 1 }).then(messages => messages.array()[0].edit(embed));
                            }
                            catch (err) {
                                console.log(err);
                                statuschannel.sendMessage("ERR :disappointed:" + err);
                            };
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                    statuschannel.sendMessage("ERR :disappointed:" + err);
                };
            });
        }, 60000);
    }
}
