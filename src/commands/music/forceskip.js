const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["forceskip"],
};

exports.help = {
    name: "forceskip",
    description: "Forceskips the current song.",
    usage: "forceskip [Volume]",
    category: "Music"
};