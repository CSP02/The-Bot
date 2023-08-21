const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  name: 'discordjs',
  data: new SlashCommandBuilder()
    .setName("discordjs")
    .setDescription("Displays the link for learning discord.js "),

  async execute(client, interaction, Discord) {
    const embedMsg = new Discord.EmbedBuilder()
      .setColor('#9C27B0')
      .setTitle('__Discord.js tutorial links__')
      .addFields([
        { name: ' Official Discord.js Guide : ', value: '[discord.js guide](https://discordjs.guide)' },
        { name: ' Guide by Codelyon : ', value: '[Codelyon guide](https://anidiots.guide/getting-started/getting-started-long-version)' },
        { name: ' Tutorial series by Codelyon :  ', value: '[YouTube tutorials of codelyon](https://youtube.com/playlist?list=PLbbLC0BLaGjpyzN1rg-gK4dUqbn8eJQq4)' },
        { name: ' Tutorial series by Worn off keys : ', value: '[YouTube tutorials of WOK](https://youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe)' }
      ])
      .setThumbnail("https://i.ibb.co/7th2xwt/images.png")
      .setFooter({ text: 'See github repository of the atelier bot by using !gh command. Enjoy learning Discord-js and make your own custom bot 😃 .' })
    interaction.reply({ embeds: [embedMsg] });
  }
}