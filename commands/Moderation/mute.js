const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')
const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'mute',
	description: 'mutes the mentioned user in a guild',
	syntax: '!mute <user>',
	permissions: [PermissionsBitField.Flags.ViewAuditLog],
	async execute(client, message, args, Discord) {
		try {
			const modOrAdmin = message.member.permissions.has(PermissionsBitField.Flags.KickMembers);
			const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
			const server = message.guild
			const infrType = 'mute'

			if (modOrAdmin) {
				const target = message.mentions.users.first()
				if (target) {
					let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
					let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');


					memberTarget = message.guild.members.cache.get(target.id)
					if (memberTarget.permissions.has(PermissionsBitField.Flags.ViewAuditLog) && !message.member.permissions.has('ADMINISTRATOR')) {
						message.channel.send('Be a good mod.');
					}
					else {
						let time
						if (!isNaN(args[1])) {
							time = args[1]
							timeUnits = args[2]
							if(!args[2]){
								return message.channel.send("mention the units of time\n's' for seconds, 'm' for minutes, 'hr' for hours, 'd' for days and 'w' for weeks")
							}
							switch (timeUnits){
								case 's':
									time = args[1] * 1000
									break
								case 'm':
									time = args[1] * 60 * 1000
									break
								case 'hr':
									time = args[1] * 60 * 60 * 1000
									break
								case 'd':
									time = args[1] * 24 * 60 * 60 * 1000
									break
								case 'w':
									time = args[1] * 7 * 24 * 60 * 60 * 1000
									break
								default:
									return message.channel.send("invalid units\n's' for seconds, 'm' for minutes, 'hr' for hours, 'd' for days and 'w' for weeks")
							}
							const tar = message.mentions.users.first()
							let mem = message.guild.members.cache.get(tar.id)
							mem.timeout(time, args.slice(3).join(' '))
						} else {
							memberTarget.roles.add(mutedRole.id)
						}
						const guildId = message.guild.id;
						const userId = target.id;
						let reason = 'Undefined'
						if (args[1] && !isNaN(args[1])) {
							reason = args.slice(3).join(' ')
						} else {
							reason = args.slice(1).join(' ')
						}
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
							author: message.member.user.id,
							userID: userId,
							timestamp: new Date().getTime(),
							reason,
							infrType,
							infrID
						}

						if (reason == '') {
							reason = 'unspecified'
						}

						const embedMsg = new Discord.EmbedBuilder()
							.setColor('#ff0000')
							.setTitle('Muted:')
							.setThumbnail(`${target.displayAvatarURL()}`)
							.setDescription(`<@${memberTarget.user.id}> has been muted`)
							.setFooter({text: `Infraction ID: ${infrID}`})
							.addFields([{ name: 'Reason:', value: `${reason}` }])

						message.channel.send({ embeds: [embedMsg] });
						sLogsChannel.send({ embeds: [embedMsg] })
						memberTarget.send(`You were muted in the server:\n**${message.guild.name}** Because:\n**${reason}**. Take care.`)

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
				} else if (args[0]) {
					message.channel.send('cant find that member');
				} else {
					message.channel.send('Mention the user you want to mute')
				}
			} else {
				message.reply('you have no permission');
			}
		} catch (e) {
			console.log(e)
			// require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
		}
	}
}