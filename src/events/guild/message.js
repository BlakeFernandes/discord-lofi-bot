const Discord = require("discord.js");
const config = require("../../../config");

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const prefix = config.prefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
    const commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
    if (!commandfile) return;

    if (message.channel.type === "dm") {
        if (commandfile.conf.guildOnly === true) return message.channel.send("This command is not available in DMs.")
    }

    if (message.channel.type === "text") {
        if (commandfile.conf.dmOnly === true) return message.channel.send("This command is only available in DMs.")
    }

    if (commandfile) commandfile.run(bot, message, args);
}