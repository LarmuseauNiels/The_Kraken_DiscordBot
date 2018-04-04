const admins = require("../data/admins.json");
module.exports = {
    name: "clean",
    desc: "cleans messages",
    example: "clean",
    run: (client, message, args, commands, config) => {
        if(isInArray(message.author.id, admins)) {
        try{
            let messagecount = parseInt(args);
            messagecount++;
            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
            message.delete();
        }
        catch (er)  {message.reply("ERR: Please specify a number");}
        }
        else{
            message.reply("ERR: No premissions");
        }
    }
};


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}