const timezones = require("../data/timezones.json");

module.exports = {
    name: "time",
    desc: "Displays time for someone's local timezone",
    example: "!time 10pm cest",
    alias: ["t","timezone"],
    run: (client, message, args, commands, config, discord, logger) => {
        if (args.length > 0) { 
            try{
            args = args.map(a => a.toLowerCase());
            let timezone = Object.keys(timezones).filter(val => args.includes(val.toLowerCase()))[0];
            let offset = timezones[timezone];
            args.splice(args.indexOf(timezone.toLowerCase()), 1);
            let time;
            args = args.join("");
            let meridian = "";
            let minutes = parseInt(args.split(":")[1]) | 0;
            if (args.endsWith("pm")) time = parseInt(args.slice(0, -2)) + 12 % 24;
            else if (args.endsWith("am")) time = parseInt(args.slice(0, -2));
            else {
                time = parseInt(args);
                meridian = "am";
            }
            let midnight = new Date();
            midnight.setUTCHours(time);
            midnight.setUTCMinutes(minutes);
            midnight.setUTCSeconds(0);
            time = new Date(midnight.getTime() - (offset) * 1000 * 60 * 60);
            //message.channel.sendEmbed(new (require("discord.js")).RichEmbed().setTimestamp().setDescription("I think it is currently this time for you"));
            return message.channel.sendEmbed(new (require("discord.js")).RichEmbed().setTimestamp(time).setDescription(`Today, ${args+meridian} ${timezone} converts to:`));
            }
            catch(e){
                message.reply("Thats now how you use !time, try something like: !time 10pm cest");
            }
        } else {
            // assuming 2018, its not a leap year
            const month_lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const date = new Date();
            message.channel.send("What month are you looking for? (1-12)");
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 10000,
                error: ["time"]
            }).then(msgs => {
                const month = parseInt(msgs.first().content);
                if (isNaN(month) || month > 12 || month < 1) return message.channel.send(month + " is an invalid month.");
                const month2 = month - 1;
                let total = 1; // because jan 1 was on sunday in 2017 start at 0 (2018 monday start at 1)
                for (let i = 0; i < month2; i++) {
                    total += month_lengths[i];
                }
                const monthstart = total % 7;
                let x = " SUN MON TUE WED THU FRI SAT \n|" + "   |".repeat(monthstart);
                for (let i = monthstart; i < month_lengths[month2] + monthstart; i++) {
                    x += ("  " + (i - monthstart + 1)).slice(-3) + "|";
                    if ((i + 1) % 7 === 0) x += "\n|";
                }
                message.channel.send("```prolog\nPick a day and time (24h format).\n" + x + "\nExample: 23 3:34```").then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                       max: 1,
                       time: 10000,
                       error: ["time"]
                    }).then(msgs => {
                        const [inDay, inTime] = msgs.first().content.split(" ");
                        const day = parseInt(inDay); 
                        if (isNaN(day) || day > month_lengths[month2] || day < 1) return message.channel.send(`${inDay} ${inTime} is an invalid entry.`);
                        const [hour, minutes] = inTime.split(":");
                        date.setUTCMonth(month2);
                        date.setUTCDate(day);
                        date.setUTCHours(parseInt(hour));
                        date.setUTCMinutes(parseInt(minutes));
                        message.channel.sendEmbed(new (require("discord.js")).RichEmbed().setTimestamp().setDescription("I think it is currently this time for you"));
                        message.channel.sendEmbed(new (require("discord.js")).RichEmbed().setTimestamp(date).setDescription(`So ${month}/${day} ${inTime} UTC must be`));
                    }).catch(e => {
                        console.error(e);
                        message.channel.send("Incorrect something.");
                    });
                });
            }).catch(e => {
                message.channel.send("Sorry bitch too slow");
            });
        }
    }    
}
