const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'points',
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('shows the points of a user')
		.addUserOption(option =>
			option.setName("user")
				.setDescription("user to show points of")
				.setRequired(false)
		),

	async execute(client, interaction, Discord) {
		try {
			const guildId = interaction.guild.id
			const mem = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Points')
			const author = interaction.user.id
			await mongo().then(async mongoose => {
				try {
					const results = await pointsSchema.findOne({
						guildId: guildId,
					})
					if (results === null) {
						const embedMsg = new Discord.EmbedBuilder()
							.setTitle('Points')
							.setColor('#ff0000')
							.setDescription('No events were hosted in this guild.')
						return interaction.reply({ embeds: [embedMsg] })
					}
					for (const points of results.points) {
						const { author, user, point } = points
						if (user == mem.id) {
							embedMsg
								.setDescription('Really amazed')
								.setFooter({ text: 'Keep participating in jams and events to get points' })
								.setColor('#fcc603')
								.setThumbnail(mem.avatarURL(true))
								.addFields(
									[{ name: 'User', value: `${mem}` },
									{ name: 'points', value: `${point}` }]
								)
							return interaction.reply({ embeds: [embedMsg] })
						} else {
							embedMsg
								.setColor('#fcc603')
								.setDescription('User not found in database. seems like not participated in jams/events till now')
						}
					}
					return interaction.reply({ embeds: [embedMsg] })
				} finally {
					mongoose.connection.close()
				}
			})
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}