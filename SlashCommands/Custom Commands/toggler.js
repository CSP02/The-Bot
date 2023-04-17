const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'togglerjs',
	data: new SlashCommandBuilder()
		.setName("togglerjs")
		.setDescription('sends the cdn link and docs links for toggler.js'),

	async execute(client, interaction, Discord) {
		interaction.reply("Link for Toggler CDN:\n https://cdn.jsdelivr.net/gh/Chandra-sekhar-pilla/Toggler@main/Toggler.js\n\nToggler Docs:\nhttps://the-atelier.ml/Pages/Toggler/toggler.html")
	}
}  