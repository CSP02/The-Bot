const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data:new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!')
}