const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'codeblocks',
	data: new SlashCommandBuilder()
		.setName('codeblocks')
		.setDescription('Get info about codeblocks'),

	async execute(client, interaction, Discord) {
		interaction.reply("You can use 3 back ticks to represent something in a codeblocks. \nFor example:\n\\```\n // your code. \n\\```\n\n To send a code with syntax highlighting you can use language name after 3 back ticks\n\nFor Example:\n\n\\```js\n//yourcode\n\\```\n\nThese languages can be highlighted -")
	}
}