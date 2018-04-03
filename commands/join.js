module.exports = {
    name: "join",
    desc: "joins the senders voice channel",
    example: "join",
    run: (client, message, args, commands, config) => {
      // Voice only works in guilds, if the message does not come from a guild,
        // we ignore it
        if (!message.guild) return;

        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('You have awoken The Kraken!');
        })
            .catch(console.log);
        } else {
        message.reply('The Kraken can not find you!');
        }
    }
};
