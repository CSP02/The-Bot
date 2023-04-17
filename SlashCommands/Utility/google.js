const { SlashCommandBuilder } = require('discord.js');
module.exports = {

    name: 'google',
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Macro which sends google search link'),

    execute(client, interaction, Discord) {
        interaction.reply("Sounds like something <https://www.google.com/> would know!")
    }
}