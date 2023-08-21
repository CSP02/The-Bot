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
      const replies = [
        "Yes",
        "No",
        "Maybe",
        "Never",
        "Definitely!",
        "Ask again later",
        "Most likely",
        "Cannot predict now.",
        "indeed",
        "perhaps",
        `${emote}`,
        `The What ${emote}`,
        "Absolutely", "Definitely not", "Of course", "Certainly", "No way", "Without a doubt", "I don't think so", "You bet", "Not at all", "It's possible", "I'm afraid not", "I doubt it", "For sure", "Negative", "I'm inclined to say yes", "I'm leaning towards no",
        "Yep", "Nah", "True", "False", "Sure thing", "Not really", "I suppose so", "Unlikely", "Absolutely not", "I'm not so sure", "You got it", "No doubt", "In all likelihood", "It's unlikely", "I'd say so", "It's a possibility", "Certainly not", "Not in a million years", "You're right", "I can't say for certain",
        "I'm not quite sure, but maybe?", "I'm a bit confused, but I'll go with yes.", "Hmm, I'm not sure how to answer that with a simple yes or no.", "This is a tough one... I'm leaning towards yes, though.", "Oh, I'm feeling a bit puzzled here. Let's say yes for now?", "Well, this question has me scratching my head, but I'll tentatively say no.", "I'm a bit lost, but let's go with a hesitant yes.", "Honestly, I'm baffled. Maybe yes?", "My circuits are a bit jumbled by this question. I guess no?", "I'm in a state of confusion here, but my gut says yes.", "Confusion overload! How about a confused yes?", "I'm as confused as a cat in a dog park, but let's say no.", "This question has me stumped, but I'll opt for a cautious yes.", "I'm divided on this one. Let's settle for a puzzled no.", "Can I phone a friend? Just kidding! I'll say yes, I think.", "I'm feeling like a compass in a magnetic storm, but my compass points to no.", "I'm tangled up in thought, but I'll say no for now."]
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