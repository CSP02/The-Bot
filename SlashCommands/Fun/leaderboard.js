const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'leaderboard',
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('shows the leaderboard of the server'),


	async execute(client, interaction, Discord) {
		try {
			const guildId = interaction.guild.id
			var largest = parseInt('0', 10)
			var topMembers = []
			var topMemberName = []
			var leadMember = []
			var lead = []


			try {
				await mongo().then(async mongoose => {
					try {
						const results = await pointsSchema.findOne({
							guildId: guildId,
						})
						if (results === null) {
							const msgemb = new Discord.EmbedBuilder()
								.setColor("#ff0000")
								.setDescription(`No events were hosted or no one participated in this guild`)

							return interaction.reply({ embeds: [msgemb] })
						}
						var i, k
						for (const points of results.points) {
							topMembers.push(parseInt(points.point, 10))
							topMemberName.push(points.user)
						}
						var j = topMembers.length
						for (i = 0; i < j; i++) {
							leadMember.push(Math.max(...topMembers))
							var biggestNum = Math.max(...topMembers)
							for (k = 0; k <= j; k++) {
								if (topMembers[k] == biggestNum) {
									topMembers[k] = parseInt('0', 10)
									lead.push(topMemberName[k])
								} else {
									continue
								}
							}
						}
						const embdMsg = new Discord.EmbedBuilder()
							.setTitle("Leaderboard")
							.setColor("#00ff00")
						for (var l = 0; l < 3; l++) {
							if (lead[l] === null) {
								break
							}
							else {
								embdMsg
									.addFields(
										[{ name: `${l + parseInt('1', 10)}`, value: `<@${lead[l]}>\nPoints ${leadMember[l]}` }]
									)
							}
						}
						interaction.reply({ embeds: [embdMsg] })

					} finally {
						mongoose.connection.close()
					}
				})
			} catch (e) {
				interaction.reply(e.interaction)
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}