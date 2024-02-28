const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    const { channel } = message.member.voice;
    let player = undefined;

    if (!channel) return message.channel.send('<:error:823018096184262666> **You have to be in a voice channel to use this command.**');
    if (!args.length) return message.channel.send('<:error:823018096184262666> **You need to give me a URL or a search term.**');

    if (message.client.manager.players.get(message.guild.id) === undefined) {
        player = message.client.manager.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id,
            volume: 30,
            selfDeafen: true
        });
        player.connect();
    } else {
        player = message.client.manager.players.get(message.guild.id);
    }


    const search = args.join(' ');
    let res;

    try {
        res = await player.search(search, message.author);
        if (res.loadType === 'LOAD_FAILED') {
            if (!player.queue.current) player.destroy();
            throw new Error(res.exception.message);
        }
    } catch (err) {
        return message.channel.send(`There was an error while searching: ${err.message}`);
    }

    switch (res.loadType) {
        case 'NO_MATCHES':
            if (!player.queue.current) player.destroy();
            return message.channel.send('No results were found.');
        case 'TRACK_LOADED':
            player.queue.add(res.tracks[0]);

            if (!player.playing && !player.paused && !player.queue.length) player.play();
            return message.channel.send(`**Adding to Queue** \`${res.tracks[0].title}\`.`);
        case 'PLAYLIST_LOADED':
            player.queue.add(res.tracks);

            //if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
            player.play();
            return message.channel.send(`**Enqueuing playlist**: \n **${res.playlist.name}** : **${res.tracks.length} tracks**`);
        case 'SEARCH_RESULT':
            let max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;

            const results = res.tracks
                .slice(0, max)
                .map((track, index) => `${++index} - \`${track.title}\``)
                .join('\n');

            const resultss = new MessageEmbed()
                .setDescription(results + "\n\n***NOTE** You have 30 seconds to select.*")
                .setColor('#d9d9d9')

            const embedMsg = await message.channel.send(resultss);

            if (message.guild.songs === undefined) {
                message.guild.songs = new Discord.Collection();
            }

            try {
                message.guild.songs.set(message.author.id, embedMsg);
                collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
                if (message.guild.songs.get(message.author.id).id !== embedMsg.id) {
                    embedMsg.delete();
                    throw new Error();
                }
            } catch (e) {
                if (!player.queue.current) player.destroy();
                return embedMsg.delete();
            }

            const first = collected.first().content;

            if (first.toLowerCase() === 'end') {
                if (!player.queue.current) player.destroy();
                return message.channel.send('Cancelled selection.');
            }

            const index = Number(first) - 1;
            if (index < 0 || index > max - 1) return message.channel.send(`the number you provided too small or too big (1-${max}).`);

            const track = res.tracks[index];
            console.log(track);
            player.queue.add(track);

            if (!player.playing && !player.paused && !player.queue.length) player.play();
            return message.channel.send(`**Adding to Queue:** \`${track.title}\`.`);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["p"],
};

exports.help = {
    name: "play",
    description: "Plays music through the bot.",
    usage: "play [SONG NAME]",
    category: "Music"
};