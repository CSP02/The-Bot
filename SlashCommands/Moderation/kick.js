const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'kick',
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user from the server.')
		.addUserOption(option => option.setName('user').setDescription('The user to kick.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the kick.').setRequired(false)),

	async execute(client, interaction, Discord) {
		try {
			const sLogsChannel = interaction.guild.channels.cache.find(chn => chn.name === 'server-logs')
			const server = interaction.guild
			const infrType = 'Kick'
			const target = interaction.options.getUser('user')
			const reason = interaction.options.getString('reason') ? interaction.options.getString('reason') : 'unspecified'
			const memberTarget = interaction.guild.members.cache.get(target.id);

			if (memberTarget.permissions.KICK_MEMBERS) { return interaction.reply("You can't do that, but nice try though.") }
			else {
				const guildId = interaction.guild.id;
				const userId = target.id;
				var infrID = parseInt('1', 10);
				await mongo().then(async mongoose => {
					try {
						const results = await warnShema.findOne({
							guildId: guildId
						})
						if (results == null) {
							return
						} else {
							var infr
							if (results.warnings.length != 0) {
								for (const warning of results.warnings) {
									const { author, userID, timestamp, reason, infrType, infrID } = warning
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
					author: interaction.user.id,
					userID: userId,
					timestamp: new Date().getTime(),
					reason,
					infrType,
					infrID
				}

				const embedMsg = new Discord.EmbedBuilder()
					.setColor('#ff0000')
					.setTitle('Kicked:')
					.setDescription(`${memberTarget} has been kicked`)
					.setFooter({ text: `Infraction ID: ${infrID}` })
					.addFields(
						[{ name: 'Reason:', value: `${reason}` }]
					)
				interaction.reply({ embeds: [embedMsg] });
				memberTarget.send({ embeds: [embedMsg] })
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

			memberTarget.kick();
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}