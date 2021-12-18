const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'prefix',
	data: new SlashCommandBuilder()
		.setName('prefix')
		.setDescription('Replies with prefix of this bot.'),

	async execute(client, interaction, Discord) {
		interaction.reply(`prefix of this bot is \`\`\`!\`\`\``);
	}
}