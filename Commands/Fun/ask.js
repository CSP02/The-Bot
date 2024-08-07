const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GenerateColor } = require('../../Generators/RandomColorGenerator.js');
const { ANSI } = require('../../Generators/AnsiColors.js');

const replies = [ //? replies of the ask command
    "", "", "Yes", "No", "Maybe",
    "Never", "Definitely!", "Ask again later", "Most likely", "Cannot predict now.", "indeed", "perhaps",
    "Absolutely", "Definitely not", "Of course", "Certainly", "No way",
    "Without a doubt", "I don't think so", "You bet", "Not at all",
    "It's possible", "I'm afraid not", "I doubt it", "For sure", "Negative",
    "I'm inclined to say yes", "I'm leaning towards no",
    "Yep", "Nah", "True", "False", "Sure thing", "Not really", "I suppose so", "Unlikely",
    "Absolutely not", "I'm not so sure", "You got it", "No doubt", "In all likelihood", "It's unlikely",
    "I'd say so", "It's a possibility", "Certainly not", "Not in a million years", "You're right",
    "I can't say for certain", "I'm not quite sure, but maybe?",
    "I'm a bit confused, but I'll go with yes.",
    "Hmm, I'm not sure how to answer that with a simple yes or no.",
    "This is a tough one... I'm leaning towards yes, though.",
    "Oh, I'm feeling a bit puzzled here. Let's say yes for now?",
    "Well, this question has me scratching my head, but I'll tentatively say no.",
    "I'm a bit lost, but let's go with a hesitant yes.", "Honestly, I'm baffled. Maybe yes?",
    "My circuits are a bit jumbled by this question. I guess no?",
    "I'm in a state of confusion here, but my gut says yes.",
    "Confusion overload! How about a confused yes?",
    "I'm as confused as a cat in a dog park, but let's say no.",
    "This question has me stumped, but I'll opt for a cautious yes.",
    "I'm divided on this one. Let's settle for a puzzled no.",
    "Can I phone a friend? Just kidding! I'll say yes, I think.",
    "I'm feeling like a compass in a magnetic storm, but my compass points to no.",
    "I'm tangled up in thought, but I'll say no for now."
];

module.exports = {
    name: 'ask',
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask a random yes/no question and bot will answer it.")
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question.')
                .setRequired(true)
        ),

    async execute(Discord, client, interaction) {
        try {
            const emojis = interaction.guild.emojis;
            const embed = new EmbedBuilder() //? Building the embed
                .setColor(GenerateColor())
                .setTitle('The magic 8 ball says:');

            const randIndex = Math.floor(Math.random() * emojis.size); //? Generate a random index
            const emote = `${emojis[randIndex]}`; //? Get a random emoji from the guild/server/community
            const question = interaction.options.getString("question"); //? Get the question from the options

            replies[0] = `${emote}`;
            replies[1] = `The What ${emote}`;

            const answer = Math.floor(Math.random() * replieslength);
            embed.addFields([
                { name: 'Question:', value: question },
                { name: 'Answer:', value: replies[answer] }
            ]);

            const avatarURL = await interaction.user.avatarURL();
            embed.setFooter({ text: interaction.user.username, iconUrl: avatarURL })
                .setTimestamp();

            return interaction.reply({ embeds: [embed] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}