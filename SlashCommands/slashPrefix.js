const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data:new SlashCommandBuilder()
	.setName('prefix')
	.setDescription('Replies with prefix of this bot.')
}