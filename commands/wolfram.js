const wolframconf = require("../data/wolfram.json");
var wolfram = require('wolfram').createClient(wolframconf.apikey);
module.exports = {
    name: "wolfram",
    desc: "queries worlfram alpha",
    example: "!wr 8*26",
    alias: ["wr","wolf"],
    run: (client, message, args, commands, config, discord, logger) => {
        wolfram.query(args, function(err, result) {
            if(err) throw err;
            message.reply("Result: " + result);
          })
    }
};