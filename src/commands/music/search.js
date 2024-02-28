const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["search"],
};

exports.help = {
    name: "search",
    description: "Searches for track results.",
    usage: "search [Song Name]",
    category: "Music"
};