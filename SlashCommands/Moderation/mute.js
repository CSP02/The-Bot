const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'mute',
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to mute.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the mute.').setRequired(false))
		.addIntegerOption(option => option.setName('time').setDescription('The time for the mute.').setRequired(false))
		.addStringOption(option => option.setName('timeunits').setDescription('The units of time for the mute.').setRequired(false)),

	async execute(client, interaction, Discord) {
		try {
			const sLogsChannel = interaction.guild.channels.cache.find(chn => chn.name === 'server-logs')
			const server = interaction.guild
			const infrType = 'mute'
			const muteReason = interaction.options.getString('reason') ? interaction.options.getString('reason') : 'unspecified'
			let time = interaction.options.getInteger('time') ? interaction.options.getInteger('time') : null
			const timeUnits = interaction.options.getString('timeunits') ? interaction.options.getString('timeunits') : null
			const target = interaction.options.getUser('user')

			if (target) {
				let mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

				memberTarget = interaction.guild.members.cache.get(target.id)
				if (memberTarget.permissions.VIEW_AUDIT_LOG && !interaction.member.permissions.ADMINISTRATOR) {
					interaction.reply('Be a good mod.');
				}
				else {
					if (time !== null) {
						if (timeUnits === null) {
							return interaction.reply("mention the units of time\n's' for seconds, 'm' for minutes, 'hr' for hours, 'd' for days and 'w' for weeks")
						}
						switch (timeUnits) {
							case 's':
								time = time * 1000
								break
							case 'm':
								time = time * 60 * 1000
								break
							case 'hr':
								time = time * 60 * 60 * 1000
								break
							case 'd':
								time = time * 24 * 60 * 60 * 1000
								break
							case 'w':
								time = time * 7 * 24 * 60 * 60 * 1000
								break
							default:
								return interaction.reply("invalid units\n's' for seconds, 'm' for minutes, 'hr' for hours, 'd' for days and 'w' for weeks")
						}
						await interaction.guild.members.cache.get(target.id).timeout(time, muteReason)
					} else {
						interaction.guild.members.cache.get(target.id).roles.add(mutedRole.id)
					}
					const guildId = interaction.guild.id;
					const userId = target.id;
					reason = muteReason
					var infrID = parseInt('1', 10);


					await mongo().then(async mongoose => {
						try {
							const results = await warnShema.findOne({
								guidId: guildId
							})
							if (results == null) {
								return
							} else {
								let reply = ' '
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
						author: interaction.member.user.id,
						userID: userId,
						timestamp: new Date().getTime(),
						reason,
						infrType,
						infrID
					}

					const embedMsg = new Discord.EmbedBuilder()
						.setColor('#ff0000')
						.setTitle('Muted:')
						.setThumbnail(`${target.displayAvatarURL()}`)
						.setDescription(`${target} has been muted`)
						.setFooter({ text: `Infraction ID: ${infrID}` })
						.addFields([{ name: 'Reason:', value: `${reason}` }])

					interaction.reply({ embeds: [embedMsg] });
					sLogsChannel.send({ embeds: [embedMsg] })
					memberTarget.send(`You were muted in the server:\n**${interaction.guild.name}** Because:\n**${reason}**. Take care.`)

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
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}