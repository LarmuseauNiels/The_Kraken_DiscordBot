const admins = require("../data/admins.json");
module.exports = {
    name: "setsecretsantas",
    desc: "match people set secret santas",
    example: "\\sendsecretsantas",
    alias: ["setsecretsanta"],
    run: (client, message, args) => {
        if(isInArray(message.author.id, admins)) {
            try {
                setsecretsanta(client, message, args);
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
        else{
            message.reply("ERR: No premissions");
        }
    }
};

function setsecretsanta(client, message, args){
    client.DBconnection.query(
        "Select ID,RequiresEU,RequiresINTER,RequiresPaypal from SSReciever ",
         function (error, recievers, fields) {
            if(error != null){ console.log(error)}
            if(recievers != null){
                client.DBconnection.query("Select ID,HasEU,HasINTER,HasPaypal from SSSender ",
                     function (error, senders, fields) {
                        let matches = [];
                        if(error != null){ console.log(error)}
                        if(senders != null){
                            recievers = shuffle(recievers);
                            senders = shuffle(senders);
                             console.log(recievers);
                             console.log(senders);
                            recievers.forEach(reciever => {
                                //senders.find
                                // find match for reciever
                                let sender = senders.find(sender => (sender.HasINTER == 1 && reciever.RequiresINTER ==1 )  || (sender.HasEU == 1 && reciever.RequiresEU ==1));
                                if(sender == null) {
                                    console.log(console.log("WARNING: can't match" + reciever.id + " with a compatible sender!!"));
                                    break;
                                };
                                matches.push({rec:reciever.id,send:sender.id});
                                recievers.splice(recievers.indexOf(reciever),1);
                                senders.splice(senders.indexOf(sender),1);
                            });
                            console.log(matches);
                            console.log("matched people: " + matches.length);
                        }
                        else{message.reply("Failed"); }
                    });
            }
            else{message.reply("Failed"); }
        });
}


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
