const mongo = require('../../schemas/mongo')
const rulesSchema = require('../../schemas/rulesSchema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'push',
	data: new SlashCommandBuilder()
		.setName('push')
		.setDescription('Pushes a rule to the database.')
		.addStringOption(option => option.setName('rule').setDescription('The rule to push.')),

	async execute(client, interaction, Discord) {
		try {
			const guildId = interaction.guild.id
			const ruleMatter = interaction.options.getString('rule')
			var ruleNo = parseInt('1', 10);

			await mongo().then(async mongoose => {
				try {
					const results = await rulesSchema.findOne({
						guildId: guildId
					})
					if (results == null) {
						return
					} else {
						let reply = ' '
						var infr
						if (results.rules.length != 0) {
							for (const rule of results.rules) {
								const { ruleNo, ruleMatter } = rule
								infr = parseInt(ruleNo, 10)
							}
							ruleNo += parseInt(infr, 10)
						}
					}
				} finally {
					mongoose.connection.close()
				}
			})

			const rule = {
				ruleNo,
				ruleMatter,
			}

			await mongo().then(async mongoose => {
				try {
					await rulesSchema.findOneAndUpdate({
						guildId,
					}, {
						guildId,
						$push: {
							rules: rule
						}
					}, {
						upsert: true
					})
				} finally {
					mongoose.connection.close()
				}
			})

			interaction.reply('Rule uploaded...!')
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}