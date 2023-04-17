const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'remove',
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a role from yourself')
		.addRoleOption(option => option.setName('role').setDescription('The role you want to remove').setRequired(true)),

	async execute(client, interaction, Discord) {
		try {
			const role = interaction.options.getRole('role')
			if (role) {
				if (role.name !== 'mod' && role.name !== 'admin' && role.name !== 'Muted') {
					if (role) {
						interaction.member.roles.remove(role).catch(console.error);
						const embedMsg = new Discord.EmbedBuilder()
							.setColor('#C155FF')
							.setTitle('__Role__:')
							.addFields([{ name: 'Role successfully removed', value: `${role}` }])
						interaction.reply({ embeds: [embedMsg] });
					}
					else {
						interaction.reply('Seems like you did not have that role.');
					}
				}
			} else {
				interaction.reply("Spedify a role to remove.")
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}