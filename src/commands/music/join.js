const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["join"],
};

exports.help = {
    name: "join",
    description: "Joins the voice channel user is in.",
    usage: "join",
    category: "Music"
};