const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.channel.send("https://discord.com/api/oauth2/authorize?client_id=412161299569442816&permissions=0&scope=bot")
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["invite"],
};

exports.help = {
    name: "invite",
    description: "Clears the current queue.",
    usage: "invite",
    category: "Music"
};