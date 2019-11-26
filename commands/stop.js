module.exports = {
    name: "stop",
    desc: "Stop all songs in the queue!",
    example: "!stop",
    alias: ["leave","cancel"],
    run: (client, message, args) => {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
    }
};  
  
  
  
