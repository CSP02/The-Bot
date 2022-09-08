const fs = require('fs')
const { InteractionType } = require('discord.js')

module.exports = async (Discord, client, interaction) => {
	try {
		if (interaction.type !== InteractionType.ApplicationCommand) {
			const customId = interaction.customId.toString()
			const args = interaction.message.content.slice(0).split(/ +/)
			const interactionFiles = fs
				.readdirSync('./interactions/').filter(file => file.endsWith('.js'))
			for (const file of interactionFiles) {
				const interactFile = require(`../../interactions/${file}`)
				// console.log(interactFile.interactTo.includes(`${customId}`))
				if (interactFile.interactTo.includes(`${customId}`)) {
					if (interaction.member.permissions.has(interactFile.permissions) || interactFile.permissions === null) {
						// console.log(interaction)
						return interactFile.execute(client, interaction, args, Discord)
					}
					else
						return interaction.reply({ content: "You have no permission", ephemeral: true })
				}
				else continue
			}
		} else {
			const interactionFiles = fs
				.readdirSync('./SlashCommands/').filter(file => file.endsWith('.js'))
			for (const file of interactionFiles) {
				const interactFile = require(`../../SlashCommands/${file}`)
				if (interactFile.name.includes(interaction.commandName)) {
					if (interactFile.permissions === null || interactFile.permissions === undefined || interaction.member.permissions.has(interactFile.permissions)) {
						// console.log(interactFile)
						return interactFile.execute(client, interaction, Discord)
					}
					else
						return interaction.reply({ content: "You have no permission", ephemeral: true })
				}
				else continue
			}
		}
	} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
	}
}