const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["rewind"],
};

exports.help = {
    name: "rewind",
    description: "Rewinds the currently playing song.",
    usage: "rewind [duration]",
    category: "Music"
};