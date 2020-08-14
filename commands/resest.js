module.exports = {
    name: "reset",
    desc: "resets music feature!",
    example: "!reset",
    alias: ["fix"],
    run: (client, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
    }
};  
  