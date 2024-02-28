const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["sto"],
};

exports.help = {
    name: "skipto",
    description: "Skips to a song in the queue.",
    usage: "skipto [Number]",
    category: "Music"
};