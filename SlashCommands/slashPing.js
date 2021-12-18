const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'ping',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),

	async execute(client, interaction, Discord) {
		interaction.reply(`Present heart beat of the bot is ${client.ws.ping}ms.`);
	}
}