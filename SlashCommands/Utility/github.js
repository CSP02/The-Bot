const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    name: 'github',
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get the github link of this bot'),

    async execute(client, interaction, Discord) {
        interaction.reply({ content: '[The-Bot github repository](https://github.com/CSP02/The-Bot)' });
    }
}