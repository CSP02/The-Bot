const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  name: 'learnjs',
  data: new SlashCommandBuilder()
    .setName("learnjs")
    .setDescription("Sends useful links to learn javascript"),

  async execute(client, interaction, Discord) {
    const embed = new Discord.EmbedBuilder()
      .setColor('#DDFF00')
      .setThumbnail("https://i.ibb.co/5sy5y5H/javascript-logo.png")
      .addFields([
        { name: '__**Documentation:**__', value: '\u200b' },
        { name: 'MDN Javascript: ', value: '[MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)' },
        { name: 'W3School (Javascript):  ', value: '[W3 Schools docs](https://www.w3schools.com/js/)' },
        { name: 'jQuery Documentation: ', value: '[jQuery docs](http://contribute.jquery.org/documentation/)' },
        { name: 'NodeJS: ', value: '[NodeJS docs](https://nodejs.org/en/docs/)' },
        { name: '__**Tutorials:**__ ', value: '\u200b' },
        { name: 'Eloquent Javascript: ', value: 'http://eloquentjavascript.net/' },
        { name: "You Don't Know JS: ", value: 'https://github.com/getify/You-Dont-Know-JS ' },
        { name: 'Modern Javascript: ', value: 'https://javascript.info/ ' },
        { name: '__**Interesting:**__', value: '\u200b' },
        { name: 'You might not need jQuery: ', value: 'http://youmightnotneedjquery.com/ ' },
        { name: 'CodingTrain (tutorials with examples using p5.js): ', value: '[YouTube tutorials for JS](https://www.youtube.com/user/shiffman)' }
      ])
      .setFooter({ text: "This list does not contain every resource out there because the internet is huge and listing everything down is impossible." })
    interaction.reply({ embeds: [embed] });
  }
}