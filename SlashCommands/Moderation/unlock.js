const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'unlock',
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlocks the channel.'),

	execute(client, interaction, Discord) {
		try {
			const everyoneRole = interaction.guild.roles.everyone
			interaction.channel.permissionOverwrites.edit(everyoneRole, { SendMessages: true })
			interaction.reply('channel unlocked successfully.')
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
} 