const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GenerateColor } = require("../../Generators/RandomColorGenerator");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "serverinfo",
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Sends the information about the server/community"),

    async execute(Discord, client, interaction) {
        try {
            const serverName = interaction.guild.name; //? Serevr name
            const serverOwner = interaction.guild.ownerId; //? Owner of the server
            const createdAt = interaction.guild.createdAt; //? The day when the server was created
            //? Server description, if null set it to "No description" 
            const serverDes = interaction.guild.description === null ? "No description" : interaction.guild.description;
            const serverInvites = [];

            await interaction.guild.invites.fetch().then(invites => { //? Server invite links
                [...invites].forEach((invite, i) => {
                    serverInvites.push(`${i + 1}. ${invite[1]}`);
                })
            })

            const embed = new EmbedBuilder()
                .setTitle(serverName)
                .setDescription(serverDes)
                .setColor(GenerateColor())
                .addFields([
                    { name: "Owner:", value: `<@${serverOwner}>` },
                    { name: "Created At:", value: new Date(createdAt).toLocaleDateString() },
                    { name: "Member count:", value: interaction.guild.memberCount.toString() },
                    { name: "Invites:", value: serverInvites.join("\n") }
                ])
                .setThumbnail(interaction.guild.iconURL());

            interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}