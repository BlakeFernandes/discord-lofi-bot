const { MessageEmbed } = require('discord.js');
const config = require('../../../config');
const request = require('request');
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");

module.exports = async bot => {
    console.log(`${bot.user.username} is available now!`)

    var PREFIX = config.prefix;
    a=0;
    bot.guilds.cache.each(guilds => a+=guilds.memberCount)
    var activities = [ `${bot.guilds.cache.size} servers`, `${a} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${PREFIX}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)

    const nodes = [
        {
            host: config.music.lavalinkhost,
            password: config.music.lavalinkpassword,
            port: config.music.lavalinkport,
        }
    ];

    const clientID = config.music.spotifyid;
    const clientSecret = config.music.spotifysecret;

    //HERE spCID and spCS are your SPOTIFY APPLICATION'S ID AND SECRET. MAKE AN APP ON SPOTIFY'S WEB DEV PORTAL TO ACCESS THE TOKEN KEYS
    bot.manager = new Manager({
        nodes,
        plugins: [ new Spotify({ clientID, clientSecret }) ],
        autoPlay: true,
        secure: false,
        send: (id, payload) => {
            const guild = bot.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });
    //initialize the manager
    bot.manager.init(bot.user.id);

    console.log(`Logged in as ${bot.user.tag}`);

    //on node connect. NOTE: NODE HERE IS YOUR LAVALINK NODE/Server
    bot.manager.on("nodeConnect", node => {
        console.log(`Node "${node.options.identifier}" connected.`)
    })


    //Node error event
    bot.manager.on("nodeError", (node, error) => {
        console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
    })

    bot.manager.on("trackError", (node, error, error2) => {
        console.log(`Node "${node.toString()}" encountered an error: ${error.toString()}.`)
        console.log(error)
        console.log(error2)
    })

    bot.on("raw", d => bot.manager.updateVoiceState(d));

    //Track start
    bot.manager.on("trackStart", (player, track) => {
        const channel = bot.channels.cache.get(player.textChannel);
        let min = Math.floor((track.duration/1000/60) << 0), sec = Math.floor((track.duration/1000) % 60);
        let sec2;
        if(sec < 10) {
            sec2 = `0${sec}`
        }
        else {
            sec2 = sec
        }

        //Embed sent after the track starts playing.
        let np = new MessageEmbed()
            .setThumbnail("http://i3.ytimg.com/vi/" + track.identifier + "/maxresdefault.jpg")
            .setColor("#d9d9d9")
            .setDescription(`**Now playing:** \n\`${track.title}\`\nRquested by [ ${track.requester} ]\nDuration: [ \`${min}:${sec2}\` ]`)
        channel.send(np).then(m => m.delete({ timeout: track.duration }));
    });

    // Emitted when the player queue ends
    // TODO: Don't leave the voice call immediately, instead wait a timeout period.
    bot.manager.on("queueEnd", player => {
        const channel = bot.channels.cache.get(player.textChannel);
        channel.send("Queue has ended. Bye! :wave: ");
        player.destroy();
    });


    //When someone manually disconnects the bot. it justs destroys the player.
    bot.manager.on("socketClosed", (player, payload) => {
        if(payload.byRemote === true) player.destroy();
    });

    bot.manager.on("playerMove", (player, currentChannel, newChannel) => {
        if(!newChannel) player.destroy();
        else player.voiceChannel = newChannel;
    });
}