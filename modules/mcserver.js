let channelid =  '531264884470710287';//531264884470710287
const pinger = require('minecraft-pinger');//541909711642034186
module.exports = function (client, discord) {
    let serverchannel = client.channels.get(channelid);
    //serverchannel.send("t");
    setInterval(function () {
            pinger.ping('94.23.255.19', '23987', (error,result) => {
                if(error) { console.log(error)}
                else{
                    let embed = new discord.RichEmbed();
                    embed.setAuthor("Server status").setDescription("FTB infinity evolved");
                    embed.addField("Server", "94.23.255.19:23987", true);
                    embed.addField("players online", result.players.online, false);
                    if ('sample' in result.players){
                        let sample = "";
                        result.players.sample.forEach(player => {
                            sample += player.name + " "
                        });
                        embed.addField("player sample", sample, true);
                    }
                    embed.setTimestamp();
                    serverchannel.fetchMessages({ limit: 3 }).then(messages => messages.array()[1].edit(embed));
                }
            });
    }, 59000);
}