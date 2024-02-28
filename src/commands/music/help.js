const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
     message.channel.send("**LofiGirl Commands**\n!play <song>\n!join\n!leave\n!leavecleanup\n!loop\n!loopqueue\n!nowplaying\n!pause\n!playskip <song>\n!queue\n!remove <position>\n!removedupes\n!resume\n!rewind\n!seek <timestamp>\n!shuffle\n!skip\n!skipto <position>\n!stop\n!volume <amount>\n");
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["help"],
};

exports.help = {
    name: "help",
    description: "Leaves the voice channel.",
    usage: "help",
    category: "Music"
};