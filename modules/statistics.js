
const cron = require('node-cron');
const config = require("../data/statsconfig.json");
var knownUserCache = [];




module.exports = function (client) {
    console.log("loading statistics module");
    -
    client.on('channelCreate', (channel) => { 
        if(channel instanceof (client.discord.VoiceChannel)){
            if(channel.guild.id == "530537522355240961"){
                console.log("new flaming palm voice channel made");
                client.DBconnection.query(
                    'INSERT INTO Channel (ID,ChannelName) VALUES (?,?)',[channel.id,channel.name], function (error, results, fields) {
                        if(error != null){ console.log(error);}
                    });
            }
        }
    });
    client.DBconnection.query(
        'Select ID from Members', function (error, results, fields) {
            if(error != null){ console.log(error)}
            results.forEach(result => knownUserCache.push(result.ID))
        });
    cron.schedule('30 0,15,30,45 * * * *', () => {
        console.log('running statistics tracking cron job');
        client.DBconnection.query(
            'Select ID from Channel', function (error, results, fields) {
                if(error != null){ console.log(error)}
                var trackedChannels = [];
                results.forEach(result => trackedChannels.push(result.ID));
                trackedChannels.forEach(channelID =>{
                    client.channels.fetch(channelID, false)
                    .then(channel => Array.from(channel.members.values()).forEach(member => {
                        if(!knownUserCache.includes(member.id)){
                            client.DBconnection.query(
                                'INSERT INTO Members (ID,DisplayName,avatar) VALUES (?,?,?)',
                                [member.user.id, member.user.username, member.user.avatar], function (error, results, fields) {
                                    if(error != null){ console.log(error)}
                                });
                            knownUserCache.push(member.id)
                        }
                        client.DBconnection.query(
                        'INSERT INTO VoiceConnected (ID, ChannelID) VALUES (?, ?)',
                        [member.user.id, channelID], function (error, results, fields) {
                            if(error != null){ console.log(error)}
                        });
                    }) )
                    .catch( err => console.log(err));
                });   
            });
    });
}



