const request = require("request");
const ecoconfig = require("./data/ecoconfig.json");
module.exports = function () {
    this.starteco = function starteco(client, discord) {
        setInterval(function () {

            let statuschannel = client.channels.get(ecoconfig.serverstatuschannel);
            request("http://query.li/api/eco/" + ecoconfig.serverip + '/' + ecoconfig.serverport, (err, res, body) => {

                if (err) console.log("ERR eco 10"+err);
                try {
                    let contents = JSON.parse(body);
                    if (contents.status.error) { console.log("ERR eco 13"+err); }
                    else {
                        sendmsg(client,discord,ecoconfig,contents,statuschannel);
                    }
                }
                catch (err) {
                    console.log("ERR eco 19"+err);
                    statuschannel.sendMessage("ERR :disappointed:" + err);
                };
            });
        }, 20000);
    }
}

var sendmsg = function (client,discord,ecoconfig,contents,statuschannel) {
    console.log("executing 3 ");
    request("https://ecoservers.io/api/?object=servers&element=detail&key=" + ecoconfig.ecoserversapikey, (err, res, body) => {
        console.log("executing 4");
        if (err) console.log("ERR eco 31"); 
        try {
            let ecoapi = JSON.parse(body);
            let embed = new discord.RichEmbed();
            embed.setAuthor("Server status").setDescription("The Legion eco server status");
            embed.addField("Server", contents.game.info.server_name, false);
            embed.addField("serverip", ecoconfig.serverip + ':' + ecoconfig.serverport, false);
            embed.addField("Game version", contents.game.info.version, false);
            embed.addField("Players", contents.game.info.max_players, false);
            embed.addField("Players online", ecoapi.players, false);
            embed.addField("Map size", contents.game.info.map, false);
            embed.addField("Economy", contents.game.info.details.EconomyDesc, false);
            embed.addField("World Leader", contents.game.info.details.Leader, false);
            embed.setTimestamp();
            statuschannel.fetchMessages({ limit: 1 }).then(messages => messages.array()[0].edit(embed));
        }
        catch (err) {
            console.log("ERR eco 48");
            statuschannel.sendMessage("ERR :disappointed:" + err);
        };
    });
}