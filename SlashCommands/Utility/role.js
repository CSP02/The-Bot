const { SlashCommandBuilder } = require('discord.js');
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
				return role.permissions.has(PermissionsBitField.Flags.ViewAuditLog);
			}

			const isSpecialRole = () => {
				return role.permissions.has(PermissionsBitField.Flags.CreatePublicThreads)
			}

			if (!isStaff && !isSpecialRole && !role.permissions.has(PermissionsBitField.Flags.ChangeNickname) && role.id !== "<id of muted role>" && !role.name.includes("bot") && !role.name.includes("Bot")) {
				interaction.member.roles.add(role)
				interaction.reply({ embeds: [embedMsg] })
			} else {
				interaction.reply("You can't add this role.")
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
