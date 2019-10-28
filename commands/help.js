module.exports = {
    name: "help",
    desc: "shows this helptext",
    example: "!help",
    alias: ["h"],
    run: (client, message, args) => {
        var helpmsg = new client.discord.RichEmbed();
        helpmsg.setAuthor("Commands", message.author.displayAvatarURL).setDescription("Command list");
        let cmds = [];
        client.commands.forEach(cmd => {if(!isInArray(cmd, cmds))cmds.push(cmd)});
        //console.log(cmds);
        cmds.forEach(command => {
            helpmsg.addField(command.name, command.desc + ' \nUsage: '+ command.example);
        });
        message.channel.send(helpmsg);
        message.delete();
    }
};

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}



