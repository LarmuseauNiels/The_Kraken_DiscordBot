module.exports = {
    name: "sendsecretsantas",
    desc: "Tell people who their gift reciever is",
    example: "\\sendsecretsantas",
    alias: ["sss"],
    run: (client, message, args) => {
        client.DBconnection.query(
            "Select SenderID,RecieverID,SSReciever.Address,SSReciever.StoreLinks from SSLink "+
            " JOIN SSReciever on RecieverID = SSReciever.ID",
             function (error, results, fields) {
                if(error != null){ console.log(error)}
                if(results != null){
                    results.forEach(result => {
                        client.users.fetch(result.RecieverID).then(reciever => {
                            client.users.fetch(result.SenderID).then(santa => {
                                santa.send("Your are the secret santa for " + reciever.username +"\n" 
                                + " Address: "+ result.Address + "\n Store links: " + result.StoreLinks );
                            })
                        })
                    })
                    message.reply("secret santa info send");
                }
                else{
                    message.reply("Failed");
                }
            });
    }
};
