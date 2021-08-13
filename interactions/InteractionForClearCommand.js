module.exports = {
	interactTo: ['clearNo', 'clearNoUser', 'clearYes', 'clearYesUser'],
	permissions:['VIEW_AUDIT_LOG'],
	async execute(client, interaction, args, Discord) {
		if (interaction.customId == 'clearNo' || interaction.customId == 'clearNoUser') {
			interaction.update({
				content: 'cancelled',
				components: [
					new Discord.MessageActionRow()
						.addComponents(
							new Discord.MessageButton()
								.setCustomId('clearYesUser')
								.setLabel("Yes")
								.setStyle('DANGER')
								.setDisabled(),

							new Discord.MessageButton()
								.setCustomId('clearNoUser')
								.setLabel("No")
								.setStyle('PRIMARY')
								.setDisabled(),
						)
				]
			}).catch(err => {
				const embdmsg = new Discord.MessageEmbed()
					.setTitle("error")
					.setColor("#ff0000")
					.setDescription(`${err.message}`)
				return interaction.channel.send({ embeds: [embdmsg] })
			})
		} else if (interaction.customId == 'clearYes') {
			try {
				await interaction.channel.messages.fetch({ limit: args[6] }).then(messages => {
					interaction.channel.bulkDelete(messages).catch(err => {
						const embdmsg = new Discord.MessageEmbed()
							.setTitle("error")
							.setColor("#ff0000")
							.setDescription(`${err.message}`)
						return interaction.channel.send({ embeds: [embdmsg] })
					});
					interaction.reply(`${args[6]} messages were deleted.`)
				});
			} catch (e) {
				interaction.channel.send(e.message)
			}
		} else if (interaction.customId == 'clearYesUser') {
			try {
				await interaction.channel.bulkDelete(userMessage).catch(err => {
					const embdmsg = new Discord.MessageEmbed()
						.setTitle("error")
						.setColor("#ff0000")
						.setDescription(`${err.message}`)
					return interaction.channel.send({ embeds: [embdmsg] })
				})
				interaction.channel.send({ constent: `messages of ${target} were deleted` })
			} catch (error) {
				interaction.channel.send(error.message)
			}
		}
	}
}