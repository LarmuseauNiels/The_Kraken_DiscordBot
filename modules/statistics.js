const mysql      = require('mysql');
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
        // client.channels.fetch('530537522921734178', false)
        // .then(channel => channel.members.array.forEach(snowflake, member => {
        //     // if(!knownUserCache.includes(member.id)){
        //     //     //add user to DB
        //     //     knownUserCache.push(member.id)
        //     // }
        //     connection.query(
        //     'INSERT INTO VoiceConnected (ID) VALUES (?)',
        //     [member.id], function (error, results, fields) {
        //         if(error != null){ console.log(error)}
        //     });
        // }) )
        // .catch( err => console.log(err));
    });
}






  


//   connection.query(
//     'INSERT INTO VoiceConnected (ID) VALUES (?)',
//     [member.id], function (error, results, fields) {
//         if(error != null){ console.log(error)}
//     // error will be an Error if one occurred during the query
//     // results will contain the results of the query
//     // fields will contain information about the returned results fields (if any)


//   });

