const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'lock',
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Locks the channel.'),

	async execute(client, interaction, Discord) {
		try {
			const everyoneRole = interaction.guild.roles.everyone
			interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
				SendMessages: false
			}).catch(e => {
				interaction.reply(e.interaction)
			})
			interaction.reply('Channel locked successfully.')
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
} 