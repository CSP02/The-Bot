const { SlashCommandBuilder } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "unlock",
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Unlocks the channel in which this command is sent."),

    async execute(Discord, client, interaction) {
        try {
            const channel = interaction.channel //? Get the channel in which this command was sent

            channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: true //? Set the send message permission to true
            }).then(channel => {
                interaction.reply("unlocked this channel successfully!").catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });
            }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}