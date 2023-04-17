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

			if (!role.permissions.VIEW_AUDIT_LOG && !role.id === "852183844705927190") {
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
