const admins = require("../data/admins.json");
module.exports = {
    name: "points",
    desc: "Admin command, Manages a players points, can be negative",
    example: "\\points @niels 5",
    alias: [],
    run: (client, message, args) => {
        if(isInArray(message.author.id, admins)) {
            try {

                let target = message.mentions.users.first();

                client.DBconnection.query(
                    "SELECT TotalPoints FROM `Points` WHERE userid = ?" , [target.id],
                     function (error, results, fields) {
                        if(error != null){ 
                            console.log(error)
                        }
                        else{
                            console.log(results[0].TotalPoints);
                            var PreviousPoints;
                            if(results.length == 0){
                                client.DBconnection.query(
                                'INSERT INTO Points (userid) VALUES (?)',
                                [target.id], function (error, results, fields) {
                                    if(error != null){ console.log(error)}
                                });
                                PreviousPoints = 0;
                            }
                            else{
                                PreviousPoints = results[0];
                            }
                            newpoints = PreviousPoints + args[1]

                            message.reply(newpoints);
                        }
                     }
                 );
                // client.DBconnection.query(
                //     'INSERT INTO VoiceConnected (ID, ChannelID) VALUES (?, ?)',
                //     [member.user.id, channelID], function (error, results, fields) {
                //         if(error != null){ console.log(error)}
                //     });
                // 'INSERT INTO Members (ID,DisplayName,avatar) VALUES (?,?,?)',




              } catch (err) {
                message.reply(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
              }
        }
        else{
            message.reply("ERR: No premissions");
        }
    }
};

function isInArray(value, array) {
    return array.indexOf(value) > -1;
};