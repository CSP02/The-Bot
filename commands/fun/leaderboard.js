const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')

module.exports = {
	name: 'leaderboard',
	description: "gives points for the jam participants",
	syntax: 'For users:\n !points <user>\nFor staff: !points <number of points>\n',
	InDev: true,

	async execute(client, message, args, Discord) {
		try {
			const guildId = message.guild.id
			var largest = parseInt('0', 10)
			var topMembers = []
			var topMemberName = []
			var leadMember = []
			var lead = []


			try {
				await mongo().then(async mongoose => {
					try {
						const results = await pointsSchema.findOne({
							guildId,
						})
						if (results === null) {
							const msgemb = new Discord.MessageEmbed()
								.setColor("#ff0000")
								.setDescription(`No events were hosted or no one participated in this guild`)

							return message.channel.send({ embeds: [msgemb] })
						}
						var i, k
						for (const points of results.points) {
							topMembers.push(parseInt(points.point, 10))
							topMemberName.push(points.user)
						}
						console.log(topMembers.length)
						var j = topMembers.length
						for (i = 0; i < j; i++) {
							console.log(leadMember)
							console.log(topMembers)
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
						const embdMsg = new Discord.MessageEmbed()
							.setTitle("Leaderboard")
							.setColor("#00ff00")
						for (var l = 0; l < 3; l++) {
							if (lead[l] === null) {
								break
							}
							else {
								embdMsg
									.addFields(
										{ name: `${l + parseInt('1', 10)}`, value: `<@${lead[l]}>\nPoints ${leadMember[l]}` })
							}
						}
						message.channel.send({ embeds: [embdMsg] })

					} finally {
						mongoose.connection.close()
					}
				})
			} catch (e) {
				message.channel.send(e.message)
			}
		} catch (e) {
			const emd = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setTitle('command raised an error in the source code:')
				.setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
			message.channel.send({ embeds: [emd] })
		}
	}
}