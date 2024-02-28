const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["forward"],
};

exports.help = {
    name: "forward",
    description: "Forwards the currently playing song.",
    usage: "forward [duration]",
    category: "Music"
};