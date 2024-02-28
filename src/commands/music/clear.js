const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["clear"],
};

exports.help = {
    name: "clear",
    description: "Clears the current queue.",
    usage: "clear",
    category: "Music"
};