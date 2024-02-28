const Discord = require("discord.js");
const config = require("../config.json");

const bot = new Discord.Client({ disableEveryone: true });

["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.login(config.token);