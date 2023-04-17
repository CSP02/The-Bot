const { SlashCommandBuilder } = require('discord.js');
const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')

module.exports = {
	name: 'ban',
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans the mentioned member in a guild with an infractionID')
		.addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),


	async execute(client, interaction, Discord) {
		try {
			const sLogsChannel = await interaction.guild.channels.cache.find(chn => chn.name === 'server-logs')
			const server = await interaction.guild;
			const infrType = 'Ban'
			const target = await interaction.guild.members.fetch(await interaction.options.getUser('target').id);
			const staffReason = await interaction.options.getString('reason');
			const author = await interaction.user

			if (!target)
				return interaction.reply('User not found!')
			if (target) {
				if (target.permissions.BAN_MEMBERS) {
					interaction.reply('Be a good mod').catch(err => {
						interaction.reply(`${err.interaction}`)
					});
				} else {
					if (!staffReason) {
						interaction.reply('Provide a good reason to ban a member.').catch(err => {
							interaction.reply(`${err.interaction}`)
						});
					} else {
						const guildId = interaction.guild.id;
						const userId = target.id;
						const reason = staffReason ? staffReason : 'Unspecified'
						var infrID = parseInt('1', 10);


						await mongo().then(async mongoose => {
							try {
								const results = await warnShema.findOne({
									guildId: guildId
								})
								if (results == null) {
									return
								} else {
									let reply = ' '
									var infr
									if (results.warnings.length != 0) {
										for (const warning of results.warnings) {
											const { author, userID, timestamp, reason, infrID } = warning
											infr = parseInt(infrID, 10)
										}
										infrID += parseInt(infr, 10)
									}
								}
							} finally {
								mongoose.connection.close()
							}
						})

						const warning = {
							author: author.id,
							userID: userId,
							timestamp: new Date().getTime(),
							reason,
							infrType,
							infrID
						}
						const embedMsg = new Discord.EmbedBuilder()
							.setColor('#ff0000')
							.setTitle('Banned:')
							.setFooter({ text: `Infraction ID: ${infrID}` })
							.addFields([{
								name: 'Reason:',
								value: reason
							}]);
						interaction.reply({ embeds: [embedMsg] }).catch(err => {
							interaction.reply(`${err.interaction}`)
						});
						target.send({ embeds: [embedMsg] }).catch(err => {
							interaction.reply(`${err.interaction}`)
						});
						sLogsChannel.send({ embeds: [embedMsg] }).catch(err => {
							interaction.reply(`${err.interaction}`)
						});
						target.ban().catch(err => {
							interaction.reply(`${err.interaction}`)
						});
						await mongo().then(async mongoose => {
							try {
								await warnShema.findOneAndUpdate({
									guildId,
								}, {
									guildId,
									$push: {
										warnings: warning
									}
								}, {
									upsert: true
								})
							} finally {
								mongoose.connection.close()
							}
						})
					}
				}
			} else {
				interaction.reply('cant find that member');
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
