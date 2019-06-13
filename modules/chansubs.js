const subconfig = require("../data/subconfig.json");

module.exports = function (client) {
    console.log("loading subscription module");
    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.message.channel.id  == subconfig.channelid){
            try{reaction.message.guild.member(user).addRole(reaction.message.guild.roles.find(val => val.name == reaction.message.content));}
            catch(e){console.log(e);}
        }
    });
    client.on('messageReactionRemove', (reaction, user) => {
        if(reaction.message.channel.id  == subconfig.channelid){
            try{reaction.message.guild.member(user).removeRole(reaction.message.guild.roles.find(val => val.name == reaction.message.content));}
            catch(e){console.log(e);}
        }
    });
    client.channels.get(subconfig.channelid).fetchMessages({limit: 200});
}

