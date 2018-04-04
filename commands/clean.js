const helptext = require("../data/helptext.json");
module.exports = {
    name: "clean",
    desc: "cleans messages",
    example: "clean",
    run: (client, message, args, commands, config) => {
        if(message.author.id ==="178435947816419328") {
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


