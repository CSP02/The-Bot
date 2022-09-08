module.exports = {
	name: 'event',
	description: 'sends the info about ongoing events',
	aliases: ['events'],

	async execute(client, message, args, Discord) {
		try {
			const events = await message.guild.scheduledEvents.fetch()
			let description = 'none'
			if (events.size != 0) {
				events.forEach(event => {
					description = event.description
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
					message.channel.send({ embeds: [embedMsg] })
				})
			} else {
				message.channel.send('There are no ongoing events.')
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
		}
	}
}