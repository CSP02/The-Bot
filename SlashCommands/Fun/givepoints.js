const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'give',
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('gives points to a user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('user to give points to')
				.setRequired(true)
		)
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('amount of points to give')
				.setRequired(true)
		),

	async execute(client, interaction, Discord) {
		try {
			const guildId = interaction.guild.id
			const mem = interaction.options.getUser('user')
			const author = interaction.user.id
			const amount = interaction.options.getInteger('amount')
			var po = parseInt('0', 10)
			var changed = false

			await mongo().then(async mongoose => {
				try {
					const results = await pointsSchema.findOne({
						guildId: guildId
					})
					if (results !== null) {
						for (const givenPoint of results.points) {
							const { author, user, point } = givenPoint
							if (user == mem.id) {
								po += point
								changed = true

								const points = {
									author: author,
									user: mem.id,
									point: point,
								}

								await mongo().then(async mongoose => {
									try {
										await pointsSchema.findOneAndUpdate({
											guildId
										}, {
											guildId,
											$pull: {
												points: givenPoint
											}
										})
									} finally {
										mongoose.connection.close()
									}
								})
							}
						}
					}
				}
				finally {
					mongoose.connection.close()
				}
			})
			if (changed) {
				var point = po + amount
			} else {
				var point = amount
			}

			const points = {
				author: author,
				user: mem.id,
				point: point,
			}

			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Points')
				.setFooter({ text: 'Points were given' })
				.setColor('#00ff00')
				.addFields([
					{ name: 'User:', value: `<@${mem.id}>` },
					{ name: 'Points:', value: `${amount}` },
					{ name: 'Total Points:', value: `${point}` }
				])
				.setThumbnail(mem.avatarURL(true))

			await mongo().then(async mongoose => {
				console.log("connected")
				try {
					await pointsSchema.findOneAndUpdate({
						guildId,
					}, {
						guildId,
						$push: {
							points: points
						}
					}, {
						upsert: true
					})
				} finally {
					mongoose.connection.close()
				}
			})
			interaction.reply({ embeds: [embedMsg] })
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}