const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { GenerateColor } = require("../../Generators/RandomColorGenerator");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "about",
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Sends the details about Bot."),

    async execute(Discord, client, interaction) {
        try {
            const embed = new EmbedBuilder() //? Embedd message for sending the info of bot with the link
                .setTitle("Bot info:")
                .setColor(GenerateColor())
                .setDescription("The Bot is a moderation bot which is used for moderation in The-Atelier server.\nYou can click on the ``Open Source`` button to view the source code of this bot.");
            const button = new ButtonBuilder() //? Link for open source code
                .setLabel("Open Source")
                .setStyle(ButtonStyle.Link)
                .setURL("https://github.com/CSP02/The-Bot");

            const actionRow = new ActionRowBuilder() //? Building action row to send the button with the embed
                .addComponents(button);

            interaction.reply({ embeds: [embed], components: [actionRow] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset)
        }
    }
}