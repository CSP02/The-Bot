const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'longcode',
  data: new SlashCommandBuilder()
    .setName("longcode")
    .setDescription("sends a link of pastemyst"),

  async execute(client, interaction, Discord) {
    interaction.reply('Want to send a long code? use pastemyst here is the link\nhttps://paste.myst.rs');
  }
}