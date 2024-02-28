const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["lyrics"],
};

exports.help = {
    name: "lyrics",
    description: "Searches lyrics for song name.",
    usage: "lyrics [Song Name]",
    category: "Music"
};