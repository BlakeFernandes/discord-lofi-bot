const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["playskip"],
};

exports.help = {
    name: "playskip",
    description: "Playskips to the provided song.",
    usage: "playskip [Song Name]",
    category: "Music"
};