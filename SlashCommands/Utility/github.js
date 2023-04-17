const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    name: 'github',
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get the github link of this bot'),

    async execute(client, interaction, Discord) {
        interaction.reply({ content: 'https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0' });
    }
}