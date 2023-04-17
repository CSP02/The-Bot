const { SlashCommandBuilder } = require('discord.js');
const mongo = require('../../schemas/mongo')
const giftSchema = require('../../schemas/giftSchema')

module.exports = {
	name: 'gift',
	data: new SlashCommandBuilder()
		.setName('gift')
		.setDescription('Sends a gift to a user!')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to send the gift')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('gifts')
				.setDescription('The gift you want to send')
				.setRequired(true)
				.addChoices(
					{ name: 'Cake', value: 'cake' },
					{ name: 'ToyCar', value: 'toyCar' },
					{ name: 'ChessBoard', value: 'chessBoard' },
					{ name: 'ToyTrain', value: 'toyTrain' },
					{ name: 'Vibe check', value: 'vibeCheck' },
					{ name: 'PS-4', value: 'PS4' }
				)
		),

	async execute(client, interaction, Discord) {
		await interaction.deferReply();
		const rateMap = new Map()
		rateMap.set('cake', 23)
		rateMap.set('toyCar', 50)
		rateMap.set('toyTrain', 84)
		rateMap.set('chessBoard', 56)
		rateMap.set('vibeCheck', 86)
		rateMap.set('PS4', 97)
		const target = interaction.options.getUser('target')
		const gift = interaction.options.getString('gifts')
		const userID = interaction.user.id
		const colors = ['#ff9645', '#ffeb6b', '#e6ff6b', '#baff6b', '#6bff95', '#6bffc4', '#6bfffd', '#6bd0ff', '#6b9cff', '#726bff', '#936bff', '#ae6bff', '#ce6bff', '#e96bff', '#ff6bee', '#ff3bc4', '#ff2495', '#ff2469']
		const randomIndex = Math.floor(Math.random() * colors.length);

		const giftRate = rateMap.get(gift)
		let totalPoints = {
			total: parseInt('0', 10),
			totalGifts: parseInt('0', 10)
		}
		await mongo().then(async mongoose => {

			try {
				const giftsPoints = await giftSchema.findOne({ userID })
				if (giftsPoints !== null) {


					const { total, totalGifts } = giftsPoints.gifts[0]
					if (total <= giftRate) {
						return interaction.editReply('You didnt have enough coins to buy and send this item.')
					}
					const tot = total - giftRate
					let totalGiftsSent = totalGifts + 1
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

					totalPoints = { total: tot, totalGifts: totalGiftsSent }
				} else {
					return interaction.editReply('You didn\'t have enough coins use ``!collect`` (yes its not a slash command) command to collect some coins.')
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
			.setTitle('Gift received')
			.setColor(`${colors[randomIndex]}`)
			.setDescription(`<@${userID}> has send you a ${gift} which is ${giftRate}CCs(chistmas coins).`)
		await interaction.editReply({ content: `<@${target.id}>`, embeds: [embed] });
	}
}