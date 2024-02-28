const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["loopqueue"],
};

exports.help = {
    name: "loopqueue",
    description: "Loops the current queue.",
    usage: "loopqueue",
    category: "Music"
};