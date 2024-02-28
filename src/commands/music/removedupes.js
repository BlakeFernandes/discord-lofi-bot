const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["removedupes"],
};

exports.help = {
    name: "removedupes",
    description: "Removes duplicate songs from the queue.",
    usage: "removedupes",
    category: "Music"
};