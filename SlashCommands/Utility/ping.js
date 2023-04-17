const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'ping',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with client latency!'),

	async execute(client, interaction, Discord) {
		interaction.reply(`Present heart beat of the bot is ${client.ws.ping}ms.`);
	}
};