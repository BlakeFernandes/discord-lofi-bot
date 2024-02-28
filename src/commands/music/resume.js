const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.reply("I have not joined a channel because I have nothing to play. Use the play command to play the song.");

    const { channel } = message.member.voice;

    if (!channel) return message.reply("You need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");
    if (!player.paused) return message.reply("The player is already resumed.");

    player.pause(false);
    return message.reply("Resumed the player.");
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["resume"],
};

exports.help = {
    name: "resume",
    description: "Resumes a paused song.",
    usage: "resume",
    category: "Music"
};