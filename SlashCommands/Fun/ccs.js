const mongo = require('../../schemas/mongo')
const giftSchema = require('../../schemas/giftSchema')
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'checkcoins',
	data: new SlashCommandBuilder()
		.setName("checkcoins")
		.setDescription('checks info about your coins and number of gifts you sent'),

	async execute(client, interaction, Discord) {
		let eligibleRoles = ''
		let showSanta = false
		let showDrummer = false
		let showRoud = false
		let showSnow = false
		let showElv = false

		try {
			const userID = interaction.user.id
			let totalCoins
			let totalGiftsSent
			let isAvailable = false
			const santaAmount = 200
			const snowmanAmount = 170
			const christmasElvAmount = 120
			const rudolphAmount = 50
			const drummerAmount = 10
			const colors = ['#ff9645', '#ffeb6b', '#e6ff6b', '#baff6b', '#6bff95', '#6bffc4', '#6bfffd', '#6bd0ff', '#6b9cff', '#726bff', '#936bff', '#ae6bff', '#ce6bff', '#e96bff', '#ff6bee', '#ff3bc4', '#ff2495', '#ff2469']
			const randomIndex = Math.floor(Math.random() * colors.length);
			await mongo().then(async mongoose => {
				try {
					const giftsPoints = await giftSchema.findOne({
						userID: userID,
					})
					if (giftsPoints !== null) {
						isAvailable = true
						const { total, totalGifts } = giftsPoints.gifts[0]
						totalCoins = total
						console.log(total, totalGifts)
						totalGiftsSent = totalGifts
						if (totalGiftsSent >= 60) {
							eligibleRoles = 'You are eligible to get all roles'
							showDrummer = true
							showSanta = true
							showRoud = true
							showSnow = true
							showElv = true
						} else if (totalGiftsSent < 60 && totalGiftsSent >= 40) {
							eligibleRoles = 'Little Drummer Boy, Rudolph, Christmas Elve and Snowman'
							showDrummer = true
							showSanta = false
							showRoud = true
							showSnow = true
							showElv = true

						} else if (totalGiftsSent < 40 && totalGiftsSent >= 30) {
							eligibleRoles = 'Little Drummer Boy, Rudolph, Chrismas Elve'
							showDrummer = true
							showSanta = false
							showRoud = true
							showSnow = false
							showElv = true
						} else if (totalGiftsSent < 30 && totalGiftsSent >= 20) {
							eligibleRoles = 'Little Drummer Boy and Rudolph'
							showDrummer = true
							showSanta = false
							showRoud = true
							showSnow = false
							showElv = false
						} else if (totalGiftsSent < 20 && totalGiftsSent >= 10) {
							eligibleRoles = 'Little Drummer Boy'
							showDrummer = true
							showSanta = false
							showRoud = false
							showSnow = false
							showElv = false
						} else {
							eligibleRoles = 'You are not yet eligible to get any special roles.'
							showDrummer = false
							showSanta = false
							showRoud = false
							showSnow = false
							showElv = false
						}
					} else {
						isAvailable = false
					}
				} finally {
					mongoose.connection.close()
				}
			})
			if (!isAvailable) {
				return interaction.reply('You have no coins yet. You can start by sending a gift to someone or by using the `!collect` command.')
			}
			const embed = new Discord.EmbedBuilder()
				.setTitle('Coins collected')
				.setColor(`${colors[randomIndex]}`)
				.addFields([
					{ name: 'Total coins left:', value: `${totalCoins} coins are left.` },
					{ name: 'Total gifts sent:', value: `${totalGiftsSent} gifts were sent.` },
					{ name: 'Eligible Roles:', value: `User is eligible for ${eligibleRoles} role(s)` }
				])
			let row
			if (showDrummer && showElv && showRoud && showSnow && showSanta) {
				row = ''
				row = new Discord.ActionRowBuilder()
					.addComponents([
						new Discord.ButtonBuilder()
							.setCustomId('Little Drummer Boy')
							.setLabel('Little Drummer Boy')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Rudolph')
							.setLabel('Rudolph')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Christmas Elve')
							.setLabel('Christmas Elve')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Snowman')
							.setLabel('Snowman')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Santa claus')
							.setLabel('Santa claus')
							.setStyle('PRIMARY')
					])
				return interaction.reply({ embeds: [embed], components: [row] })
			}
			if (showDrummer && showElv && showRoud && showSnow) {
				row = ''
				row = new Discord.ActionRowBuilder()
					.addComponents([
						new Discord.ButtonBuilder()
							.setCustomId('Little Drummer Boy')
							.setLabel('Little Drummer Boy')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Christmas Elve')
							.setLabel('Christmas Elve')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Rudolph')
							.setLabel('Rudolph')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Snowman')
							.setLabel('Snowman')
							.setStyle('PRIMARY')
					])
				return interaction.reply({ embeds: [embed], components: [row] })
			}
			if (showDrummer && showElv && showRoud) {
				row = ''
				row = new Discord.ActionRowBuilder()
					.addComponents([
						new Discord.ButtonBuilder()
							.setCustomId('Little Drummer Boy')
							.setLabel('Little Drummer Boy')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Christmas Elve')
							.setLabel('Christmas Elve')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Rudolph')
							.setLabel('Rudolph')
							.setStyle('PRIMARY'),
					])
				return interaction.reply({ embeds: [embed], components: [row] })
			}
			if (showDrummer && showRoud) {
				row = ''
				row = new Discord.ActionRowBuilder()
					.addComponents([
						new Discord.ButtonBuilder()
							.setCustomId('Little Drummer Boy')
							.setLabel('Little Drummer Boy')
							.setStyle('PRIMARY'),
						new Discord.ButtonBuilder()
							.setCustomId('Rudolph')
							.setLabel('Rudolph')
							.setStyle('PRIMARY')
					])
				return interaction.reply({ embeds: [embed], components: [row] })
			}
			if (showDrummer) {
				row = ''
				row = new Discord.ActionRowBuilder()
					.addComponents([
						new Discord.ButtonBuilder()
							.setCustomId('Little Drummer Boy')
							.setLabel('Little Brummer Boy')
							.setStyle('PRIMARY')
					])
				return interaction.reply({ embeds: [embed], components: [row] })
			} else {
				return interaction.reply({ embeds: [embed] })
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}