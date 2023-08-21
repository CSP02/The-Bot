const { PermissionsBitField } = require('discord.js');
module.exports = {
	interactTo: ['Little Drummer Boy', 'Rudolph', 'Snowman', 'Santa claus', 'Christmas Elve'],
	permissions: [PermissionsBitField.Flags],
	async execute(client, interaction, Discord) {
		try {
			const customId = interaction.customId
			let myRole
			switch (customId) {
				case 'Little Drummer Boy':
					myRole = interaction.guild.roles.cache.find(role => role.name === customId);
					interaction.member.roles.add(myRole)
					interaction.update({ content: `You are now ${myRole.name}`, components: [] })
					break
				case 'Rudolph':
					myRole = interaction.guild.roles.cache.find(role => role.name === customId);
					interaction.member.roles.add(myRole)
					interaction.update({ content: `You are now ${myRole.name}`, components: [] })
					break
				case 'Christmas Elve':
					myRole = interaction.guild.roles.cache.find(role => role.name === customId);
					interaction.member.roles.add(myRole)
					interaction.update({ content: `You are now ${myRole.name}`, components: [] })
					break
				case 'Snowman':
					myRole = interaction.guild.roles.cache.find(role => role.name === customId);
					interaction.member.roles.add(myRole)
					interaction.update({ content: `You are now ${myRole.name}`, components: [] })
					break
				case 'Santa claus':
					myRole = interaction.guild.roles.cache.find(role => role.name === customId);
					interaction.member.roles.add(myRole)
					interaction.update({ content: `You are now ${myRole.name}`, components: [] })
					break
				default:
					return
			}
		} catch (e) {
			const emd = new Discord.EmbedBuilder()
				.setColor('#ff0000')
				.setTitle('command raised an error in the source code:')
				.setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
			interaction.reply({ embeds: [emd] })
		}
	}
}