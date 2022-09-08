const { PermissionsBitField } = require('discord.js');
module.exports = {

    name: 'github',
    aliases: ['gh', 'source'],
    description: "Displays the link for the bot's repository.",
    syntax:'!github',
		permissions: [PermissionsBitField.Flags.ViewChannel],
    execute(client, message, args, Discord){
        message.reply({content:'https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0'});
    }
}