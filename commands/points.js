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
                          message.reply(results);
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
                message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
              }
        }
        else{
            message.reply("ERR: No premissions");
        }
    }
};