const mysql = require('mysql');
const cron = require('node-cron');
//const config = require("../data/statsconfig.json");
var knownUserCache = []
var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : 'root',
  password : process.env.DBPASS,
  database : 'discordstats'
});

module.exports = function (client) {
    console.log("loading statistics module");

    cron.schedule('35 0,15,30,45 * * * *', () => {
        console.log('running a cron job');
        client.channels.fetch('530537522921734178', false)
        .then(channel => Array.from(channel.members.values()).forEach(member => {
            if(!knownUserCache.includes(member.id)){
                connection.query(
                    'INSERT INTO Members (ID,DisplayName,avatar) VALUES (?,?,?)',
                    [member.user.id, member.user.username, member.user.avatar], function (error, results, fields) {
                        if(error != null){ console.log(error)}
                    });
                knownUserCache.push(member.id)
            }
            connection.query(
            'INSERT INTO VoiceConnected (ID, ChannelID) VALUES (?, ?)',
            [member.user.id, '530537522921734178'], function (error, results, fields) {
                if(error != null){ console.log(error)}
            });
        }) )
        .catch( err => console.log(err));
    });
}



