const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors");
const { GenerateColor } = require("../../Generators/RandomColorGenerator");
const rockPaperScissor = { //? Init the rockPaperScissor object (I just don't want to compare strings)
    1: "Rock",
    2: "Paper",
    3: "Scissor"
}

module.exports = {
    name: "rockpaperscissor",
    data: new SlashCommandBuilder()
        .setName("rockpaperscissor")
        .setDescription("Play rock paper scissor with the bot.")
        .addNumberOption(option =>
            option.setName("your_choice").setDescription("Your choice")
                .addChoices([
                    { name: "Rock", value: 1 },
                    { name: "Paper", value: 2 },
                    { name: "Scissor", value: 3 }
                ])
                .setRequired(true)
        ),

    async execute(Discord, client, interaction) {
        try {
            const userChoice = interaction.options.getNumber("your_choice"); //? Get the user choice
            const randomIndex = Math.floor(Math.random() * 3); //? Generate a random index
            //? If the random index is 0 set bot choice to 1. 'cause when we check for object using key there is no "0" key
            const botChoice = randomIndex === 0 ? 1 : randomIndex;

            const embed = new EmbedBuilder()
                .setTitle("Rock Paper Scissor!")
                .addFields([
                    { name: "Your Choice:", value: rockPaperScissor[userChoice] },
                    { name: "My Choice:", value: rockPaperScissor[botChoice] }
                ])
                .setColor(GenerateColor())
                .setTimestamp();

            if (userChoice > botChoice) { //? If user choice is greater than bot choice i.e user's material can sabotage/destroy bot's material except for the rock and scissor case (according to this code)
                /**
                 * ? So this code works as follow:
                 * ? Let's say user chose "Rock" whose value is "1", now let's say bot's choice is "Paper" i.e. "2" that means paper can sabotage the rock and the condition is paper > rock
                 * ? Now let's say user chose "Paper" and bot chose "Scissor", now the scissor can cut through the paper and the condition is scissor > paper
                 * ? Now the special case where user chose "Rock" and bot chose "Scissor", now rock > scissor but the condition takes as scissor > rock. 
                 * ? For this special case we use this block of code 
                 */
                if (botChoice === 1 && userChoice === 3) //? If the bot chose "Rock" and user chose "Scissor"
                    embed.addFields([
                        { name: "Winner:", value: `<@${client.user.id}>` } //? In this case whoever chose the "Rock" wins i.e. Bot is winner
                    ])
                    .setThumbnail(client.user.displayAvatarURL());
                else
                    embed.addFields([
                        { name: "Winner:", value: `<@${interaction.member.user.id}>` } //? If it's reverse i.e user chose "Rock" and bot chose "Scissor", user wins
                    ])
                    .setThumbnail(interaction.member.displayAvatarURL());
            } else if (userChoice === botChoice) //? If both bot and user chose the same material it's a tie break
                embed.addFields([
                    { name: "Winner", value: "Well it's a tie break!" } 
                ])
            else //? This block executes when bot's choice is greater than user choice.
                if (botChoice === 3 && userChoice === 1)  //? Check if bot chose "Scissor" and user chose "Rock". If yes then the user is the winner
                    embed.addFields([
                        { name: "Winner:", value: `<@${interaction.member.user.id}>` }
                    ])
                    .setThumbnail(interaction.member.displayAvatarURL());
                else //? Otherwise the bot is the winner
                    embed.addFields([
                        { name: "Winner:", value: `<@${client.user.id}>` }
                    ])
                    .setThumbnail(client.user.displayAvatarURL());

            return interaction.reply({ embeds: [embed] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}