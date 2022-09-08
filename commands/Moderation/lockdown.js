const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'lock',
	description: 'Locks the whole channel',
	aliases: ['lockdown'],
	syntax: '!lock',
	permissions: [PermissionsBitField.Flags.ViewAuditLog],
	execute(client, message, args, Discord) {
		try{
			const everyoneRole = message.guild.roles.everyone
			message.channel.permissionOverwrites.edit(message.guild.roles.everyone,{
				SendMessages: false
			 }).catch(e => {
				message.channel.send(e.message)
			})
			message.channel.send('Channel locked successfully.')
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
} 