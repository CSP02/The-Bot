const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  name: 'youtube',
  data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Macro which sends youtube link'),

  async execute(client, interaction, Discord) {
    interaction.reply("You can learn more by watching tutorials\n[YouTube](<https://www.youtube.com/>)")
  }
}