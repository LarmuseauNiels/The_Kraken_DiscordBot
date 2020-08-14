const subconfig = require("../data/subconfig.json");

module.exports = function (client) {
    console.log("loading subscription module");
    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.message.channel.id  == subconfig.channelid){
            try{ 
                reaction.message.guild.roles.fetch()
                .then(
                    roles => {
                        reaction.message.guild.member(user).roles.add(Array.from(roles.cache.values()).find(val => val.name == reaction.message.content));
                    })
                .catch(err => console.log(err))
            }
            catch(e){console.log(e);}
        }
    });
    client.on('messageReactionRemove', (reaction, user) => {
        if(reaction.message.channel.id  == subconfig.channelid){
            try{ 
                reaction.message.guild.roles.fetch()
                .then(
                    roles => {
                        reaction.message.guild.member(user).roles.remove(Array.from(roles.cache.values()).find(val => val.name == reaction.message.content));
                    })
                .catch(err => console.log(err))
            }
            catch(e){console.log(e);}
        }
    });
    client.channels.fetch(subconfig.channelid).then()
    .then(channel => channel.messages.fetch({limit: 100})) 
    .catch( err => console.log(err)
    );
}

