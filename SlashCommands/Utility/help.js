const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('sends detailed help about slashCommands you can use.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('View about this command.')
				.setRequired(false)
		),

	async execute(client, interaction, Discord) {
		try {
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Help')
				.setColor('#00ff00');
			const commandFolders = fs
				.readdirSync('SlashCommands/')
				.filter(file => file.endsWith(''))
			const menu = new Discord.StringSelectMenuBuilder()
				.setCustomId(`Help`)
				.setPlaceholder('Select Module')
			const requestedCommand = interaction.options.getString('command')
			const allModuleCommands = []

			for (const folder of commandFolders) {
				const { Module, Description, Commands } = require(`../../SlashCommands/${folder}/ModuleInfo.js`)
				embedMsg.addFields(
					[
						{ name: Module, value: Description },
					]
				)
				allModuleCommands.push(Commands)
				menu.addOptions({ label: `${Module}`, value: `${Module}` })
			}

			let commandInfo
			if (requestedCommand) {
				for (let i = 0; i < allModuleCommands.length; i++) {
					const moduleCommands = allModuleCommands[i]
					commandInfo = moduleCommands.filter(command => command.Name === requestedCommand)
					if (commandInfo.length > 0) { break } else { continue }
				}

				if (commandInfo.length <= 0) return interaction.reply("Command not found!\nuse /help to get list of commands.")

				const embedMsg = new Discord.EmbedBuilder()
					.setTitle("Help")
					.setColor('#00ff00')
					.addFields(
						[
							{ name: 'Command', value: commandInfo[0].Name },
							{ name: 'Description', value: commandInfo[0].Description },
							{ name: 'Syntax', value: commandInfo[0].Syntax },
							{ name: 'Permission', value: commandInfo[0].Permission },
						]
					)

				return interaction.reply({ embeds: [embedMsg], ephemeral: true })
			}
			if (menu) {
				const actionRow = new Discord.ActionRowBuilder()
					.addComponents(menu)
				return interaction.reply({ content: "use !help <command_name> or /help <command_name> to know about a certain command and select a Module from the dropdown below", embeds: [embedMsg], components: [actionRow], ephemeral: true });
			}
			else
				return interaction.reply({ embeds: [embedMsg], ephemeral: true });

		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
