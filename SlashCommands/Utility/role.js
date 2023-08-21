const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'role',
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Get all roles of the server')
		.addRoleOption(option => option.setName('role').setDescription('The role you want to get info about').setRequired(true)),
	async execute(client, interaction, Discord) {
		try {
			const role = interaction.options.getRole('role') ? interaction.options.getRole('role') : null
			const embedMsg = new Discord.EmbedBuilder()
				.setColor('#00ff00')
				.setTitle('Server Roles:')
				.setDescription(`Role ${role} added to ${interaction.member}`)

			const isStaff = () => {
				return role.permissions.has(PermissionsBitField.Flags.ViewAuditLog) || role.permissions.has(PermissionsBitField.Flags.ManageRoles);
			}

			const isSpecialRole = () => {
				return role.permissions.has(PermissionsBitField.Flags.CreatePublicThreads)
			}

			const userRoles = interaction.member.roles.cache.filter(role => role.name.includes("Color"))
			interaction.member.roles.remove(userRoles)
			if (!isStaff() && !isSpecialRole() && !role.permissions.has(PermissionsBitField.Flags.ChangeNickname) && role.id !== "852183844705927190" && !role.name.includes("bot") && !role.name.includes("Bot")) {
				interaction.member.roles.add(role)
				interaction.reply({ embeds: [embedMsg] })
			} else {
				//console.log(isStaff(), isSpecialRole())
				interaction.reply("You can't add this role.")
			}
		} catch (e) {
			console.log(e.stack)
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
