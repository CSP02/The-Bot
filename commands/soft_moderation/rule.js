const mongo = require('../../schemas/mongo')
const rulesSchema = require('../../schemas/rulesSchema')
const { PermissionsBitField } = require('discord.js');

module.exports = {

	name: 'rule',
	description: "sends the rule",
	aliases: ['rule', 'Rule'],
	syntax: '!rule <number>',
	permissions: [PermissionsBitField.Flags.ViewChannel],

	async execute(client, message, args, Discord) {
		try{
			const ruleNum = parseInt(args[0], 10)
			var reply = 'undefined'
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Rule')
				.setColor('#ff0000')

			await mongo().then(async mongoose => {
				try {
					const guildId = message.guild.id
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
										[{ name: `Rule ${args[0]}`, value: reply }]
									)
								message.channel.send({ embeds: [embedMsg] })
								return
							}
						}
					}
				}
				finally {
					mongoose.connection.close()
				}
			})
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
}