const { SlashCommandBuilder } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "lock",
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks the channel in which this command is sent."),

    async execute(Discord, client, interaction) {
        try {
            const channel = interaction.channel; //? Get the channel in which command was sent

            channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: false //? Set send message permission to false for @everyone
            }).then(channel => {
                interaction.reply("Locked this channel successfully!");
            }).catch(error => {
                console.log(error);
                interaction.reply("An error occured while executing this command!").catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}