const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'debug',
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('A way to debug your code/game in unity.'),

	async execute(client, interaction, Discord) {
		//sends a way to debug your unity C# code
		await interaction.reply("If you have a code which isn't working and there are no errors or warnings of such kind use ``Debug.Log()``. This will help you where actually the unknown error is.\nlet's take an example like if you wrote a code of rotating something but after you start or run the code the object is not rotating use ``Debug.Log()`` command at the part where you think the code is not working.This is a nice practise even while in general coding. ~~Even I use this type of commands more~~.\n\n'When you get lost, use Debug.Log()' - BLAME <@341756841576890378> for this quote.")
	}
}