const mongo = require("../../schemas/mongo")
const schema = require("../../schemas/schema")
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'userinfo',
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get info about a user')
		.addUserOption(option => option.setName('user').setDescription('The user you want to get info about').setRequired(false)),

	async execute(client, interaction, Discord) {
		try {
			const user = interaction.options.getUser('user')
			let target = interaction.guild.members.cache.get(user.id);
			if (!target) {
				target = interaction.member
			}
			memberRoles = target._roles
			mentionedRoles = ""
			memberTeams = ""
			const guildId = interaction.guild.id
			memberRoles.forEach(roles => {
				if (interaction.guild.roles.cache.get(roles).name.includes("Team")) {
					memberTeams += `<@&${roles}>\n`
				} else {
					mentionedRoles = `${target.roles.highest}\n`
				}
			})

			if (memberTeams === "") {
				memberTeams += "This user is not in any team"
			} if (mentionedRoles === "") {
				mentionedRoles += "This user has  no roles"
			}
			let reply = ' '
			let infrCount = parseInt("0", 10)

			await mongo().then(async mongoose => {
				try {
					const results = await schema.findOne({
						guildId
					})
					if (results !== null) {
						for (const warning of results.warnings) {
							const { author, userID, timestamp, reason, infrType, infrID } = warning
							if (userID == target.user.id) {
								infrCount++;
							}
						}
					} else {
						return
					}
				} finally {
					mongoose.connection.close()
				}
			}).catch(console.error)
			const embMsg = new Discord.EmbedBuilder()
				.setColor('#66ff66')
				.setTitle('User Info:')
				.setThumbnail(`${target.user.displayAvatarURL()}`)
				.addFields(
					[{ name: 'User Tag:', value: `${target.user.tag}` },
					{ name: 'User ID:', value: `${target.user.id}` },
					{ name: 'User Name:', value: `${target.user.username}` },
					{ name: 'User Created:', value: `${target.user.createdAt.toLocaleDateString("en-us")}, ${target.user.createdAt.toLocaleTimeString('en-US')}` },
					{ name: 'User Joined:', value: `${target.joinedAt.toLocaleDateString("en-us")}, ${target.joinedAt.toLocaleTimeString('en-US')}` },
					{ name: 'Highest Role:', value: `${mentionedRoles}` },
					{ name: 'Team:', value: `${memberTeams}` },
					{ name: 'Infractions:', value: `${infrCount}` }]
				)
			interaction.reply({ embeds: [embMsg] });
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}