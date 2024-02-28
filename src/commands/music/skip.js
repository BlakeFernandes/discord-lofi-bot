const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id); //get the player
    const queue = player.queue; //get the player queue

    if (!player) return message.reply("I have not joined a channel because I have nothing to play. Use the play command to play the song."); //if the player is not playing anything, return.
    if (!player.playing) player.playing = true; //if the player is not playing, is stuck, or is paused, it will set the property to true to play the track and immediately skip it.

    message.reply("d");
    await message.react("⏩");
    player.stop(); //stop the player. By stopping basically you are stopping the player from playing the current track. So it will automatically play the next track in queue.

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["skip"],
};

exports.help = {
    name: "skip",
    description: "Skips the current song being played.",
    usage: "skip",
    category: "Music"
};