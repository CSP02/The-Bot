const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'info',
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('sends info about The Atelier server'),

	async execute(client, interaction, Discord) {
		console.log("yes")
		const embedMsg = new Discord.EmbedBuilder()
			.setTitle('My info:')
			.setColor('#9c0af7')
			.addFields([
				{ name: 'Name:', value: 'The-Bot' },
				{ name: 'Guild Count', value: `${client.guilds.cache.size}` }
			])
		const row = new Discord.ActionRowBuilder()
			.addComponents([
				new Discord.ButtonBuilder()
					.setLabel('The-Bot')
					.setStyle('Link')
					.setURL('https://github.com/Chandra-sekhar-pilla/The-Bot-v1.4.0'),
				new Discord.ButtonBuilder()
					.setLabel('Developer website')
					.setStyle('Link')
					.setURL('https://the-atelier.ml'),
				new Discord.ButtonBuilder()
					.setLabel('Invite')
					.setStyle('Link')
					.setURL('https://discord.com/oauth2/authorize?client_id=852171190696017970&scope=applications.commands%20bot&permissions=8589934591'),
				new Discord.ButtonBuilder()
					.setLabel('official Discord Server')
					.setStyle('Link')
					.setURL('https://discord.gg/6Mcy5NpSpH')
			])

		interaction.reply({ embeds: [embedMsg], components: [row] })
	}
}