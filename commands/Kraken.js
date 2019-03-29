module.exports = {
    name: "kraken",
    desc: "Ping the Kraken",
    example: "!kraken",
    alias: ["ping","krak"],
    run: (client, message, args, commands, config, discord, logger) => {
      message.reply("Pong!")
    }
};
