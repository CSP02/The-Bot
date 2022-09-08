const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'unlock',
	description: 'unlocks a locked channel',
	aliases: ['unlockchannel'],
	syntax: '!unlock',
	permissions: [PermissionsBitField.Flags.ViewAuditLog],
	execute(client, message, args, Discord) {
		try{
			const everyoneRole = message.guild.roles.everyone
			message.channel.permissionOverwrites.edit(everyoneRole, { SendMessages: true })
			message.channel.send('channel unlocked successfully.')
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
} 