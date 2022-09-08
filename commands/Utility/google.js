const { PermissionsBitField } = require('discord.js');
module.exports = {

    name: 'google',
		permissions: [PermissionsBitField.Flags.ViewChannel],
    description: "sends the link of the google",
    syntax:'!google',
    execute(client, message, args, Discord){
            message.channel.send("Sounds like something <https://www.google.com/> would know!")
    }
}