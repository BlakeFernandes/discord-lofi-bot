const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    function clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }

    // TODO: Change to array in settings.json
    let owner = '280616156312633344'

    if (!owner.includes(message.author.id)) return;

    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.react("✅");
        var emb = new MessageEmbed()
            .setTitle('Result')
            .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
            .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
            .setColor(0xd26a0e)
        message.channel.send(emb);
    } catch (err) {
        message.react("⚠");
	    console.log(clean(args.join(" ")))
        try {
            var emb = new MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
                .setColor(0xd26a0e)
            message.channel.send(emb);
        
        } catch (err) {
            console.log(err)
        }
    }
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    dmOnly: false,
    aliases: ["evaluate"],
};

exports.help = {
    name: "eval",
    description: "Evaluates some code.",
    usage: "eval [CODE]",
    category: "Owner"
};
