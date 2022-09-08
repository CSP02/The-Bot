const mongo = require('../../schemas/mongo')
const rulesSchema = require('../../schemas/rulesSchema')
const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'pushrule',
	description: 'uploads the rule given to database',
	syntax: '!pushrule <rule(in sentence)>',
	aliases: ['rulepush', 'rp'],
	permissions: [PermissionsBitField.Flags.ViewAuditLog],
	async execute(client, message, args, Discord) {
		try{
			if (!isNaN(args[0]) || !args[0]) return message.channel.send('rule cannot be a number or null.')
			else {
				const guildId = message.guild.id
				const ruleMatter = `${args.slice(0).join(' ')}`
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

				message.channel.send('Rule uploaded...')
			}
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
}