const helptext = require("../data/helptext.json");
module.exports = {
    name: "help",
    desc: "show help",
    example: "help",
    run: (client, message, args, commands, config) => {
        var Discord = require('discord.js');
        var helpmsg = new (require("discord.js")).RichEmbed();
        helpmsg.setAuthor(helptext.title, message.author.displayAvatarURL).setDescription(helptext.description);
        //console.log(helptext);
        helptext.commands.forEach(command => {
            helpmsg.addField(command.name, command.help);
        });
        message.channel.send(helpmsg);
    }
};



