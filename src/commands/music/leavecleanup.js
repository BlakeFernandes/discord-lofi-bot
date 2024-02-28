const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["leavecleanup"],
};

exports.help = {
    name: "leavecleanup",
    description: "Removes songs from users that have left.",
    usage: "leavecleanup",
    category: "Music"
};