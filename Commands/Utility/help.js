const fs = require('fs');
const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { ANSI } = require("../../Generators/AnsiColors.js")
const { GenerateColor } = require("../../Generators/RandomColorGenerator.js")

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends detailed help about slash Commands you can use.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('View about this command.')
                .setRequired(false)
        ),

    async execute(Discord, client, interaction) {
        try {
            const commandFolders = fs.readdirSync('Commands/');
            const requestedCommand = interaction.options.getString('command');
            const allModuleCommands = [];

            const embedMsg = new EmbedBuilder()
                .setTitle('Help')
                .setColor(GenerateColor());
            const menu = new StringSelectMenuBuilder()
                .setCustomId(`help`)
                .setPlaceholder('Select Module');

            for (const folder of commandFolders) {
                const { Module, Description, Commands } = require(`../../Commands/${folder}/ModuleInfo.js`);
                embedMsg.addFields([
                    { name: Module, value: Description },
                ]);
                allModuleCommands.push(Commands);
                menu.addOptions({ label: `${Module}`, value: `${Module}` });
            }

            let commandInfo;
            if (requestedCommand) {
                for (let i = 0; i < allModuleCommands.length; i++) {
                    const moduleCommands = allModuleCommands[i];
                    commandInfo = moduleCommands.filter(command => command.Name === requestedCommand);
                    if (commandInfo.length > 0) break;
                }

                if (commandInfo.length <= 0) return interaction.reply("Command not found!\nuse /help to get list of commands.");

                const embedMsg = new EmbedBuilder()
                    .setTitle("Help")
                    .setColor(GenerateColor())
                    .addFields([
                        { name: 'Command', value: commandInfo[0].Name },
                        { name: 'Description', value: commandInfo[0].Description },
                        { name: 'Syntax', value: commandInfo[0].Syntax },
                        { name: 'Permission', value: commandInfo[0].Permission },
                    ]);

                return interaction.reply({ embeds: [embedMsg], ephemeral: true }).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });;
            }
            if (menu) {
                const actionRow = new ActionRowBuilder().addComponents(menu);
                return interaction.reply({ content: "Use ``!help <command_name>`` or ``/help <command_name>`` to know about a certain command and select a Module from the dropdown below.", embeds: [embedMsg], components: [actionRow], ephemeral: true }).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });
            }
            else
                return interaction.reply({ embeds: [embedMsg], ephemeral: true }).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });

        } catch (e) {
            console.log(ANSI.foreground.Red + e.stack + ANSI.Reset);
        }
    }
}
