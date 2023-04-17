const mongo = require('../../schemas/mongo')
const rulesSchema = require('../../schemas/rulesSchema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

	name: 'rule',
	data: new SlashCommandBuilder()
		.setName('rule')
		.setDescription('Get a rule of this server')
		.addIntegerOption(option => option.setName('rule').setDescription('The rule number you want to get').setRequired(true)),

	async execute(client, interaction, Discord) {
		try {
			const ruleNum = interaction.options.getInteger('rule')
			var reply = 'undefined'
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Rule')
				.setColor('#ff0000')

			await mongo().then(async mongoose => {
				try {
					const guildId = interaction.guild.id
					const results = await rulesSchema.findOne({
						guildId
					})
					if (results === null) {
						return
					} else {
						for (const rule of results.rules) {
							const { ruleNo, ruleMatter } = rule
							if (ruleNo == ruleNum) {
								reply = `${ruleMatter}`
								embedMsg
									.addFields(
										[{ name: `Rule ${ruleNum}`, value: reply }]
									)
								interaction.reply({ embeds: [embedMsg] })
								return
							}
						}
					}
				}
				finally {
					mongoose.connection.close()
				}
			})
		} catch (e) {
			require(`../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}