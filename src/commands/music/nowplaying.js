const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);//get the player

    if (!player || player.queue[0]) return message.channel.send("No song is currently playing in your guild!"); //check if a song is playing in the current guild
    const { title, author, thumbnail, duration } = player.queue.current; //fetch the info of the song currentply being played. Title, author, thumbnail

    //new embed
    const embed = new MessageEmbed()
        .setAuthor("Current song playing:", message.author.displayAvatarURL)
        .setThumbnail(thumbnail)
        .setDescription(`${player.playing ? "▶" : "⏸"} **${title}** \n\`by ${author}\``)
        .setColor("#d9d9d9");

    return message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["np"],
};

exports.help = {
    name: "nowplaying",
    description: "Shows the currently playing song.",
    usage: "nowplaying [Volume]",
    category: "Music"
};