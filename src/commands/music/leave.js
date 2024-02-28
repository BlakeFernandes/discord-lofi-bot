const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["leave"],
};

exports.help = {
    name: "leave",
    description: "Leaves the voice channel.",
    usage: "leave",
    category: "Music"
};