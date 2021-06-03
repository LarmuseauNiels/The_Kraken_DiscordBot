
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "poll",
    desc: "Make a poll",
    example: " \\poll How boring are paradox games? ; Very , Extreemly , Over 9000 ; 5 ",
    alias: ["poll"],
    run: (client, message, args) => {
      if(args.length == 0){
        message.reply("The correct format for the poll command is: \\poll How boring are paradox games? ; Very , Extreemly , Over 9000 ; 5   ")
      }
      else{
        var argumentGroups = message.content.slice(message.content.indexOf(' ')).split(";");
        if(argumentGroups.length == 1){
            pollEmbed(message,argumentGroups[0].trim(), ["Yes","No"],60,['👍','👎'] );
        }
        else{
            var options = argumentGroups[1].split(",");
            if(argumentGroups.length == 2){
                pollEmbed(message,argumentGroups[0].trim(), options );
            }
            if(argumentGroups.length == 3 && !isNaN(argumentGroups[2].trim())){
                pollEmbed(message,argumentGroups[0].trim(), options, parseFloat(argumentGroups[2].trim()) );
            }
            if(argumentGroups.length == 4 && !isNaN(argumentGroups[2].trim())){
                pollEmbed(message,argumentGroups[0].trim(), options, parseFloat(argumentGroups[2].trim()) , argumentGroups[3].split(","));
            }
        }
       
        
      }
    }
};

const defEmojiList = [
	'\u0031\u20E3',
	'\u0032\u20E3',
	'\u0033\u20E3',
	'\u0034\u20E3',
	'\u0035\u20E3',
	'\u0036\u20E3',
	'\u0037\u20E3',
	'\u0038\u20E3',
	'\u0039\u20E3',
	'\uD83D\uDD1F'
];

const pollEmbed = async (msg, title, options, timeout = 120, emojiList = defEmojiList.slice(), forceEndPollEmoji = '\u2705') => {
	if (!msg && !msg.channel) return msg.reply('Channel is inaccessible.');
	if (!title) return msg.reply('Poll title is not given.');
	if (!options) return msg.reply('Poll options are not given.');
	if (options.length < 2) return msg.reply('Please provide more than one choice.');
	if (options.length > emojiList.length) return msg.reply(`Please provide ${emojiList.length} or less choices.`);

	let text = `*To vote, react using the correspoding emoji.\nThe voting will end in **${timeout} minutes**.\nPoll creater can end with ${forceEndPollEmoji}.*\n\n`;
	const emojiInfo = {};
	for (const option of options) {
		const emoji = emojiList.splice(0, 1);
		emojiInfo[emoji] = { option: option.trim(), votes: 0 };
		text += `${emoji} : \`${option.trim()}\`\n\n`;
	}
	const usedEmojis = Object.keys(emojiInfo);
	usedEmojis.push(forceEndPollEmoji);

	const poll = await msg.channel.send(embedBuilder(title, msg.author.tag).setDescription(text));
	for (const emoji of usedEmojis) await poll.react(emoji);

	const reactionCollector = poll.createReactionCollector(
		(reaction, user) => usedEmojis.includes(reaction.emoji.name) && !user.bot,
		timeout === 0 ? {} : { time: timeout * 1000 * 60 }
	);
	const voterInfo = new Map();
	reactionCollector.on('collect', (reaction, user) => {
		if (usedEmojis.includes(reaction.emoji.name)) {
			if (reaction.emoji.name === forceEndPollEmoji && msg.author.id === user.id) return reactionCollector.stop();
			if (!voterInfo.has(user.id)) voterInfo.set(user.id, { emoji: reaction.emoji.name });
			// const votedEmoji = voterInfo.get(user.id).emoji;
			// if (votedEmoji !== reaction.emoji.name) {
			// 	const lastVote = poll.reactions.get(votedEmoji);
			// 	lastVote.count -= 1;
			// 	lastVote.users.remove(user.id);
			// 	emojiInfo[votedEmoji].votes -= 1;
			// 	voterInfo.set(user.id, { emoji: reaction.emoji.name });
			// }
			emojiInfo[reaction.emoji.name].votes += 1;
		}
	});

	reactionCollector.on('dispose', (reaction, user) => {
		if (usedEmojis.includes(reaction.emoji.name)) {
			voterInfo.delete(user.id);
			emojiInfo[reaction.emoji.name].votes -= 1;
		}
	});

	reactionCollector.on('end', (collected) => {
		//console.log(collected);
		text = '*Ding! Ding! Ding! Time\'s up!\n Results are in,*\n\n';
		for (const emoji in emojiInfo){
			console.log(collected.array()[0]);
			console.log(collected.array().find(x => x._emoji.name == emoji));
			emojiInfo[emoji].votes = collected.array().find(x => x._emoji.name == emoji);
			text += `\`${emojiInfo[emoji].option}\` - \`${emojiInfo[emoji].votes}\`\n\n`;
		}
		 
		poll.delete();
		msg.channel.send(embedBuilder(title, msg.author.tag).setDescription(text));
	});
};

const embedBuilder = (title, author) => {
	return new MessageEmbed()
		.setTitle(`Poll - ${title}`)
		.setFooter(`Poll created by ${author}`);
};