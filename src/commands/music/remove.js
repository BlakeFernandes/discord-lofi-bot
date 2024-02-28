const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const player = message.client.manager.players.get(message.guild.id); // get the player

    if (isNaN(args[0])) return message.channel.send('Invalid number.'); //check if the args provided by the user is a number or not.

    //return error message if the command is used to remove the current playing song
    if (args[0] == 0) return message.channel.send(`Cannot remove a song that is already playing. To skip the song type: \`${prefix}skip\``);

    if (args[0] > player.queue.length) return message.channel.send('Song not found.'); //check to see if the song exists in the queue.

    const { title } = player.queue[args[0] - 1]; //grab the title of, to be removed song

    player.queue.splice(args[0] - 1, 1); //remove the song using the splice property

    return message.channel.send(`Removed ***${title}*** from the queue`);
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["remove"],
};

exports.help = {
    name: "remove",
    description: "Removes song from queue.",
    usage: "remove",
    category: "Music"
};