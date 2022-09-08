const mongo = require('../../schemas/mongo')
const giftSchema = require('../../schemas/giftSchema')
const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'collect',
	description: 'collects some christmas coins',
	permissions: [PermissionsBitField.Flags.ViewChannel],
	aliases: ['collect'],
	cooldown:10,
	syntax: '!collect',
	async execute(client, message, args, Discord) {
		try {
				const userID = message.author.id
				const colors = ['#ff9645', '#ffeb6b', '#e6ff6b', '#baff6b', '#6bff95', '#6bffc4', '#6bfffd', '#6bd0ff', '#6b9cff', '#726bff', '#936bff', '#ae6bff', '#ce6bff', '#e96bff', '#ff6bee', '#ff3bc4', '#ff2495', '#ff2469']
				const randomIndex = Math.floor(Math.random() * colors.length);

				const giftRate = Math.floor(Math.random() * (50));
				let totalPoints
				let totalGiftsSent = parseInt('0', 10)
				await mongo().then(async mongoose => {
					try {
						const giftsPoints = await giftSchema.findOne({ userID: userID })
						if (giftsPoints !== null) {
							const { total, totalGifts } = giftsPoints.gifts[0]
							totalGiftsSent = totalGifts
							const tot = total + giftRate
							await mongo().then(async mongoose => {
								try {
									await giftSchema.findOneAndUpdate({
										userID
									}, {
											userID,
											$pull: {
												gifts: giftsPoints.gifts[0]
											}
										})
								} finally {
									mongoose.connection.close()
								}
							})
							totalPoints = { total: tot, totalGifts:totalGiftsSent }
						} else {
							totalPoints = { total: giftRate, totalGifts:totalGiftsSent }
						}
						await mongo().then(async mongoose => {
							try {
								await giftSchema.findOneAndUpdate({
									userID
								}, {
										userID,
										$push: {
											gifts: totalPoints
										}
									}, {
										upsert: true
									})
							} finally {
								mongoose.connection.close()
							}
						})
					} finally {
						mongoose.connection.close()
					}
				})
				const embed = new Discord.EmbedBuilder()
					.setTitle('Coins collected')
					.setColor(`${colors[randomIndex]}`)
					.setDescription(`Collected ${giftRate} coins`)
				await message.reply({ embeds: [embed] })
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
		}
	}
}