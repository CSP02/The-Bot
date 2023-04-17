const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'warn',
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a member.')
		.addUserOption(option => option.setName('member').setDescription('The member to warn.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the warn.')),

	async execute(client, interaction, Discord) {
		try {
			const infrType = 'warning'
			const mentioned = interaction.guild.members.cache.get(interaction.options.getUser('member').id);
			const reason = interaction.options.getString('reason') ? interaction.options.getString('reason') : 'unspecified';
			if (mentioned) {
				Warn(mentioned, reason)
			} else {
				interaction.reply('cant find member')
			}


			async function Warn(target, reason) {
				if (target.permissions.ADMINISTRATOR && !interaction.member.permissions.ADMINISTRATOR) return interaction.reply('You cannot, be a good mod.')
				else {
					const guildId = interaction.guild.id;
					const userId = target.id;
					var infrID = parseInt('1', 10);


					await mongo().then(async mongoose => {
						try {
							const results = await warnShema.findOne({
								guildId
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
						.setTitle('warned user:')
						.setThumbnail(`${target.user.displayAvatarURL()}`)
						.setDescription(`${target} has been warned`)
						.setFooter({ text: `Infraction ID: ${infrID}` })
						.addFields([{ name: 'Reason:', value: `${reason}` }]);

					interaction.reply({ embeds: [embedMsg] });
					target.send({ embeds: [embedMsg] })

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