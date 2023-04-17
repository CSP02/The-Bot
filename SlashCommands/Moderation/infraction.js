const mongo = require('../../schemas/mongo')
const schema = require('../../schemas/schema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'infraction',
	data: new SlashCommandBuilder()
		.setName('infraction')
		.setDescription('Shows the infraction of a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to show the infraction of.').setRequired(false))
		.addIntegerOption(option => option.setName('infractionid').setDescription('The ID of the infraction to show.').setRequired(false)),

	async execute(client, interaction, Discord) {
		try {
			var messId = ''
			const msg = interaction.channel.messages
			const mentionedUser = interaction.options.getUser('user')
			const infractionId = interaction.options.getInteger('infractionid')
			const embedMsg = new Discord.EmbedBuilder()

			await mongo().then(async mongoose => {
				try {
					const guildId = interaction.guild.id
					const results = await schema.findOne({
						guildId: guildId,
					})
					if (results === null) return interaction.reply("No warnings are found in this server.")
					else {
						let infrIds = ""
						if (infractionId) {
							const warnings = results.warnings.filter((warning) => {
								return warning.infrID === infractionId
							})

							embedMsg.setTitle('Infraction')
								.setColor('#ff0000')
								.setFooter({ text: `Infraction ID: ${infractionId}` })
								.addFields(
									{ name: "Author", value: `<@${warnings[0].author}>` },
									{ name: 'User', value: `<@${warnings[0].userID}>` },
									{ name: 'Infraction Type:', value: `${warnings[0].infrType}` },
									{ name: 'Reason', value: `${warnings[0].reason}` },
								)
							return interaction.reply({ embeds: [embedMsg] })
						} else {
							const warnings = results.warnings.filter((warning) => {
								return warning.userID === `${mentionedUser.id}`
							})

							warnings.forEach(warning => {
								infrIds += `${warning.infrID}, `
							})

							embedMsg.setTitle('Infraction')
								.setColor('#ff0000')
								.setFooter({ text: `Infractions of user ${mentionedUser}` })
								.addFields(
									{ name: 'Infractions', value: `${infrIds}` },
								)
							return interaction.reply({ embeds: [embedMsg] })
						}
					}
				} finally {
					mongoose.connection.close()
				}
			})
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}