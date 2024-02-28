const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["reloadm"],
};

exports.help = {
    name: "reloadmusic",
    description: "Reloads the music module.",
    usage: "reloadmusic",
    category: "Music"
};