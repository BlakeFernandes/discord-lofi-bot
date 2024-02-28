const fs = require("fs")
const Discord = require("discord.js")

module.exports = (bot) => {

    bot.commands = new Discord.Collection();
    bot.commands.music = new Discord.Collection();
    bot.commands.info = new Discord.Collection();
    bot.aliases = new Discord.Collection();

    fs.readdir(`./src/commands/music/`, (err, files) => {
        console.log(`[Music] Loading ${files.length} commands..`);
        files.forEach(f => {
            let props = require(`../commands/music/${f}`);
            bot.commands.set(props.help.name, props);
            bot.commands.music.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            })
        })
    })
    fs.readdir(`./src/commands/info/`, (err, files) => {
        console.log(`[Info] Loading ${files.length} commands..`);
        files.forEach(f => {
            let props = require(`../commands/info/${f}`);
            bot.commands.set(props.help.name, props);
            bot.commands.info.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            })
        })
    })
}