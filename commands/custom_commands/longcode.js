const { PermissionsBitField } = require('discord.js');
module.exports = {

    name: 'longcode',
    slash: false,
    description: "sends a link of pastemyst",
    aliases: ['Longcode', 'long','lc'],
		permissions:[PermissionsBitField.Flags.ViewChannel],
    syntax:'!longcode',
    execute(client, message, args, Discord){

        message.channel.send('Want to send a long code? use pastemyst here is the link\nhttps://paste.myst.rs');
    }
}