const admins = require("../data/admins.json");
module.exports = {
    name: "clean",
    desc: "Admin command, cleans a certain amount of messages",
    example: "!clean 5",
    alias: ["clear", "remove"],
    run: (client, message, args) => {
        if(isInArray(message.author.id, admins)) {
        try{
            let messagecount = parseInt(args);
            messagecount++;
            message.channel.messages.fetch({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
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