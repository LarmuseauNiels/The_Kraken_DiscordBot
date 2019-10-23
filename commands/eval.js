const admins = require("../data/admins.json");
module.exports = {
    name: "eval",
    desc: "Admin command, evaluates javascript code",
    example: "!eval 2+2",
    alias: [],
    run: (client, message, args, commands,  discord) => {
        if(isInArray(message.author.id, admins)) {
            try {
                const code = args.join(" ");
                let evaled = eval(code);
          
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
          
                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
        else{
            message.reply("ERR: No premissions");
        }
    }
};

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

const clean = text => {
    //if (typeof(text) === "string")
    //  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    //else
        return text;
}