const { SlashCommandBuilder } = require('discord.js')
module.exports = {
	name: 'event',
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Shows the current event'),


	async execute(client, interaction, Discord) {
		try {
			const events = await interaction.guild.scheduledEvents.fetch()
			if (events.size !== 0) {
				events.forEach(event => {
					const description = event.description ? event.description : "Unspecified"
					const embedMsg = new Discord.EmbedBuilder()
						.setTitle(event.name)
						.setDescription(`${description}`)
						.setColor('#00ff00')
						.addFields(
							[{ name: 'Event started at:', value: `${event.scheduledStartAt}` },
							{ name: 'Event ends at:', value: `${event.scheduledEndAt}` },
							{ name: 'Event URL:', value: `${event.url}` },
							{ name: 'Event Status:', value: `${event.status}` },
							{ name: 'Interested count:', value: `${event.userCount}` },
							{ name: 'Hosted by:', value: `${event.creator}` }]
						)
					interaction.reply({ embeds: [embedMsg] })
				})
			} else {
				interaction.reply('There are no ongoing events.')
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}