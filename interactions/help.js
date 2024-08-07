const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { GenerateColor } = require("../Generators/RandomColorGenerator.js");
const { ANSI } = require("../Generators/AnsiColors.js");

module.exports = {
    permissions: [PermissionsBitField.Flags.ViewChannel],

    async execute(client, interaction, Discord) {
        try {
            const embedMsg = new EmbedBuilder()
                .setTitle(`Module ${interaction.values}`)
                .setColor(GenerateColor());

            const requestedModule = interaction.values[0];
            const { Commands } = require(`../Commands/${requestedModule}/ModuleInfo.js`);

            Commands.forEach((command) => {
                embedMsg.addFields([
                    { name: command.Name, value: command.Description },
                ]);
            });

            interaction.update({ embeds: [embedMsg], ephemeral: true }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    },
};
