const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  name: 'ask',
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask a random question and bot will answer it.")
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question.')
        .setRequired(true)
    ),

  async execute(client, interaction, Discord) {
    var i = parseInt('0', 10)
    var emojis = []
    interaction.guild.emojis.cache.forEach(emoji => {
      emojis[i] = emoji.name
      i++
    })
    const ansIndex = Math.floor(Math.random() * emojis.length);
    const emote = interaction.guild.emojis.cache.find(emo => emo.name === `${emojis[ansIndex]}`)
    const question = interaction.options.getString("question");
    if (!question) return await interaction.reply("Please enter the question ! ");
    if (interaction.member.user.id != '437277018632093718') {
      const replies = ["Yes", "No", "Maybe", "Never", "Definitely!", "Ask again later", "Most likely", "Cannot predict now.", "indeed", "perhaps", `${emote}`]
      const answer = Math.floor(Math.random() * replies.length);
      const embed = new Discord.EmbedBuilder()
        .setColor('#e08aff')
        .setTitle('The magic 8 ball says:')
        .addFields([
          { name: 'Question:', value: question },
          { name: 'Answer:', value: replies[answer] }
        ])
        .setFooter({ text: interaction.user.username, icon_url: interaction.user.displayAvatarURL() })
        .setTimestamp()
      await interaction.reply({ embeds: [embed] });
    } else {
      const replies =
        ["fuck you",
          "listen here you lil shit",
          "fuck off",
          "Shut the hell up",
          "You have no right to have the answer",
          "Imagine asking bot a question",
          "Who is this random sod?",
          "Who the hell are you?",
          "Mum, this stranger is talking to me",
          "const me do research for... the rest of your lifespan",
          "The greatest answer is silent",
          "Sometimes silent is the best answer", `STFU ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'kekw')}`, "Yes", "No", "Maybe", "Never", "Definitely !", "Ask again later", "Most likely", "Cannot predict now.", "indeed", "perhaps", `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'pepeThink')}`, `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'kekw')}`]
      const answer = Math.floor(Math.random() * replies.length);
      const embed = new Discord.EmbedBuilder()
        .setColor('#e08aff')
        .setTitle('The magic 8 ball says:')
        .addFields([
          { name: 'Question:', value: question },
          { name: 'Answer:', value: replies[answer] }
        ])
        .setFooter({ text: interaction.user.username, icon_url: interaction.user.displayAvatarURL() })
        .setTimestamp()
      return interaction.reply({ embeds: [embed] });
    }
  }
}