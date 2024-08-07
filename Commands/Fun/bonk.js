const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    name: 'bonk',
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Sends a bonk gif.'),

    async execute(client, interaction, Discord) {
        await interaction.reply("https://tenor.com/view/bonk-gif-21852548")
    }
}