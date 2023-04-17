const mongo = require('../../schemas/mongo')
const schema = require('../../schemas/schema')
const { SlashCommandBuilder } = require('discord.js');
const infraction = require('./infraction');

module.exports = {
	name: 'deleteinfr',
	data: new SlashCommandBuilder()
		.setName('deleteinfr')
		.setDescription('Deletes an infraction from the database.')
		.addIntegerOption(option => option.setName('infractionid').setDescription('The ID of the infraction to delete.').setRequired(true)),

	async execute(client, interaction, Discord) {
		try {
			var athr = ''
			const infrId = interaction.options.getInteger('infractionid')
			const embdmsg = new Discord.EmbedBuilder()
			await mongo().then(async mongoose => {
				try {
					const guildId = interaction.guild.id
					const results = await schema.findOne({
						guildId: guildId,
					})
					if (!results) return interaction.reply('No Infractions were found in this guild.')
					else {
						const infraction = results.warnings.filter((warning) => { return warning.infrID === infrId })
						if (infraction.length > 0) {
							const { author, userID, timestamp, reason, infrType, infrID } = infraction[0]
							await mongo().then(async mongoose => {
								try {
									await schema.findOneAndUpdate({
										guildId,
									}, {
										guildId,
										$pull: {
											warnings: infraction[0]
										}
									}, {
										upsert: true
									})
								} finally {
									mongoose.connection.close()
								}
							})
							const embedMsg = new Discord.EmbedBuilder()
								.setTitle('Infraction Deleted')
								.setColor('#ff0000')
								.setFooter({ text: `Infraction ID: ${infrID}` })
								.addFields(
									{ name: "Author", value: `<@${author}>` },
									{ name: 'User', value: `<@${userID}>` },
									{ name: 'Infraction Type:', value: `${infrType}` },
									{ name: 'Reason', value: `${reason}` },
								)
							interaction.reply({ embeds: [embedMsg] })
						} else {
							return interaction.reply("No warn/mute/ban was found for the given infraction ID.")
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