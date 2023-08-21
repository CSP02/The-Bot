const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'togglerjs',
	data: new SlashCommandBuilder()
		.setName("togglerjs")
		.setDescription('sends the cdn link and docs links for toggler.js'),

	async execute(client, interaction, Discord) {
		interaction.reply("[Toggler.js CDN](https://cdn.jsdelivr.net/gh/Chandra-sekhar-pilla/Toggler@main/Toggler.js)\n\n[Toggler Docs](https://csp02.me/The-Atelier/Pages/Toggler/toggler.html)")
	}
}  