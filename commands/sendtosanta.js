module.exports = {
    name: "sendtosanta",
    desc: "send message to your secret santa",
    example: "\\sendtosanta my zip code is 9999",
    alias: ["sts","SendToSanta","sendts","sendtos"],
    run: (client, message, args) => {
        let text = message.content.slice(message.content.indexOf(" ") + 1);
        client.DBconnection.query(
            'Select SenderID from SSLink where RecieverID = ?',message.author.id,
             function (error, results, fields) {
                if(error != null){ console.log(error)}
                if(results != null){
                    client.users.fetch(results.SenderID).then(reciever => {
                        reciever.send("Gift reciever: '"+ text+ "'");
                        message.reply("Send '" + text + "' to secret santa");
                    })
                }
                else{
                    message.reply("Failed to send message");
                }
            });
    }
};
